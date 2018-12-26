<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/14/2018
 * Time: 2:50 PM
 */
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserModel as User;
use App\Models\UserSocialModel;
use Illuminate\Support\Facades\Auth;
use Socialite;
use Session;

class AuthGoogleController extends Controller
{

    /**
     * Redirect the user to the Github authentication page
     *
     * @return Response
     */
    public function redirectToProvider() {
        Session::flash('redirect_flash', $_GET['back_url'] ?? url()->previous());
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Github
     *
     * @return Response
     */
    public function handleProviderCallback() {
        // Get github's user infomation
        $user = Socialite::driver('google')->user();
        // Create user
        $email = ($user->getEmail() ? $user->getEmail() : $user->getId() . '@chiasenhac.com');
        $existUser = User::where('user_identity', '=', $user->getId())->orWhere('email', '=', $email)->first();
        if(!$existUser) {
            $existUser = User::firstOrCreate([
                'name' => $user->getName(),
                'username' => '',
                'email' => $email,
                'user_active' => DEACTIVE_USER,
                'user_avatar' => $user->avatar_original,
                'user_identity' => $user->getId(),
                'user_phone_number' => ''
            ]);
        }else{
            if(!$existUser->user_identity) {
                $existUser->user_identity = $user->getId();
                $existUser->save();
            }
            $existUser = $existUser;
        }
        Auth::login($existUser);
        return redirect(Session::get('redirect_flash') ?? '/');
    }
}