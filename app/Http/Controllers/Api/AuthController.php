<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/14/2018
 * Time: 2:50 PM
 */
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request as Request;
use App\Http\Controllers\Controller;
use App\Models\UserModel as User;
use App\Models\UserSocialModel;
use App\Models\MailTokenModel;
use Illuminate\Support\Facades\Auth;
use App\Library\Helpers;
use Socialite;
use Session;
use Illuminate\Support\Str;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\Session as SessionModel;
use Mail;

class AuthController extends Controller
{
    public function loginFacebook(Request $req) {

        $validator = Validator::make($req->all(), [
            'token' => 'required',
            'driver' => 'required',
        ]);
        if ($validator->fails()) {
            $messages = $validator->messages();
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => $messages->all()], 400);
        }
        $user = Socialite::driver('facebook')->userFromToken($req->token);
        // Create user
        $email = ($user->getEmail() ? $user->getEmail() : $user->getId() . '@chiasenhac.com');
        $existUser = User::where('user_fb_identity', '=', $user->getId())->orWhere('email', '=', $email)->first();
        if(!$existUser) {
            $existUser = User::firstOrCreate([
                'name' => $user->getName(),
                'email' => $email,
                'user_active' => ACTIVE_USER,
                'user_avatar' => $user->avatar_original,
//                'username' => $user->getId(),
                'user_fb_identity' => $user->getId(),
                'user_phone_number' => ''
            ]);
            $existUser->user_id = $existUser->id;
            $existUser->save();
        }else{
            if(!$existUser->user_fb_identity) {
                $existUser->user_fb_identity = $user->getId();
                $existUser->save();
            }
            $existUser = $existUser;
        }
        // create session login
        Auth::login($existUser);
        session()->save();
//        SessionModel::find(session()->getId())->update([
//            'user_id' => $existUser->user_id,
//            'user_agent' => $req->driver,
//        ]);
        $existUser->sid = session()->getId();
        $existUser->user_avatar_url = Helpers::pathAvatar($existUser->user_avatar, $existUser->id, env('DATA_URL'));
        // null
        return new JsonResponse(['message' => 'Success', 'code' => 200, 'data' => Helpers::convertArrHtmlCharsDecode($existUser), 'error' => []], 200);
    }
    public function loginGoogle(Request $req) {

        $validator = Validator::make($req->all(), [
            'token' => 'required',
            'driver' => 'required',
        ]);
        if ($validator->fails()) {
            $messages = $validator->messages();
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => $messages->all()], 400);
        }
        $user = Socialite::driver('google')->userFromToken($req->token);
        // Create user
        $email = ($user->getEmail() ? $user->getEmail() : $user->getId() . '@chiasenhac.com');
        $existUser = User::where('user_fb_identity', '=', $user->getId())->orWhere('email', '=', $email)->first();
        if(!$existUser) {
            $existUser = User::firstOrCreate([
                'name' => $user->getName(),
//                'username' => '',
                'email' => $email,
                'user_active' => ACTIVE_USER,
                'user_avatar' => $user->avatar_original,
                'user_identity' => $user->getId(),
                'user_phone_number' => ''
            ]);
            $existUser->user_id = $existUser->id;
            $existUser->save();
        }else{
            if(!$existUser->user_fb_identity) {
                $existUser->user_fb_identity = $user->getId();
                $existUser->save();
            }
            $existUser = $existUser;
        }
        // create session login
        Auth::login($existUser);
        session()->save();
//        SessionModel::find(session()->getId())->update([
//            'user_id' => $existUser->user_id,
//            'user_agent' => $req->driver,
//        ]);
        $existUser->user_avatar_url = Helpers::pathAvatar($existUser->user_avatar, $existUser->id, env('DATA_URL'));
        $existUser->sid = session()->getId();
        // null
        return new JsonResponse(['message' => 'Success', 'code' => 200, 'data' => Helpers::convertArrHtmlCharsDecode($existUser), 'error' => []], 200);
    }
    public function loginManual(Request $request) {
        $credentials = $request->only('email', 'password');
        $userCheck = [];
        if(!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            $userCheck = User::where('username', $request->email)->first();
            if(!$userCheck) {
                return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Tài Khoản Không Tồn tại'], 400);
            }
            $credentials = [
                'username' => $request->email,
                'password' => $request->password,

            ];
        }else{
            $userCheck = User::where('email', $request->email)->first();
            if(!$userCheck) {
                return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Tài Khoản Mật Khẩu Không Chính Xác'], 400);
            }
        }
        if($userCheck->user_login_tries > COUNT_API_TRY_LOGIN && (time() - $userCheck->user_last_login_try < TIME_API_LAST_LOGIN)) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Bạn Nhập Sai Quá Nhiều Lần, Vui Lòng Đợi 5 Phút'], 400);
        }
        $credentials['password'] = bcrypt($request->password);
        $user = \App\Models\UserModel::where($credentials)->first();
        if ($user) {
            $userCheck->user_login_tries = 0;
            Auth::login($user, (isset($request->remember) && $request->remember) ? true : false);
            session()->save();
            $user->sid = session()->getId();
            $user->remember_token_login = Auth::user()->remember_token;
            return new JsonResponse(['message' => 'Success', 'code' => 200, 'data' => Helpers::convertArrHtmlCharsDecode($user), 'error' => []], 200);
        }else{
            if((time() - $userCheck->user_last_login_try > TIME_API_LAST_LOGIN)) {
                $userCheck->user_login_tries = 0;
            }
            $userCheck->user_login_tries = $userCheck->user_login_tries + 1;
            $userCheck->user_last_login_try = time();
            $userCheck->save();
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Tài Khoản Mật Khẩu Không Chính Xác'], 400);
        }
    }
    public function logOut(Request $request) {
        if (!$request->sid) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Vui Lòng Nhập sid'], 400);
        }
        $sessionData = SessionModel::where('id', $request->sid)->first();
        if(!$sessionData) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Không Tìm Thấy Session ID'], 400);
        }
        $user = User::where('id', $sessionData->user_id)->first();
        Auth::setUser($user);
        Auth::logout();
        $sessionData->delete();
        return new JsonResponse(['message' => 'Success', 'code' => 200, 'data' => [], 'error' => 'Đăng Xuất Thành Công'], 200);
    }
    public function register(Request $request) {
        $validator = [
            'username' => 'required|string|max:25|unique:csn_users|min:4',
            'email' => 'required|string|email|max:255|unique:csn_users',
            'name' => 'required|string|min:2|max:50',
            'password' => 'required|string|min:6|max:30',
        ];
        $setAttr = [
            'username' => 'Tên Tài Khoản',
            'email' => 'Email',
            'password' => 'Mật khẩu',
            'captcha' => 'Mã bảo vệ'
        ];
        $validator = Validator::make($request->all(), $validator);
        $validator->setAttributeNames($setAttr);
        if($validator->fails()) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => $validator->errors()->toArray(), 'error' => ''], 400);
        }
        $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'user_avatar' => '',
            'user_lastvisit' => time(),
            'user_regdate' => time(),
            'user_active' => DEACTIVE_USER,
            'password' => bcrypt($request->password),
        ]);
        $user->user_id = $user->id;
        $user->save();
        $token = MailTokenModel::create([
            'email' => $request->email,
            'token' => Str::random(60),
            'created_at' => date('Y-m-d H:m', time())
        ]);
        $data = [
            'user' => $user,
            'token' => $token,
        ];
        Mail::send('emails.register', $data, function($message) use ($user)
        {
            $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
            $message->to($user->email, $user->name)->subject('Xác nhận thông tin đăng ký tài khoản Chia Sẻ Nhạc');
        });
        session()->save();
        $user->sid = session()->getId();
        return new JsonResponse(['message' => 'Success', 'code' => 200, 'data' => Helpers::convertArrHtmlCharsDecode($user), 'error' => []], 200);
    }
}