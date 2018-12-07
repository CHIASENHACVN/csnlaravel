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

class AuthFacebookController extends Controller
{

    /**
     * Redirect the user to the Github authentication page
     *
     * @return Response
     */
    public function redirectToProvider() {
        Session::flash('redirect_flash', $_GET['back_url'] ?? url()->previous());
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Obtain the user information from Github
     *
     * @return Response
     */
    public function handleProviderCallback() {
        // Get github's user infomation
        $user = Socialite::driver('facebook')->user();
        // Create user
        $email = ($user->getEmail() ? $user->getEmail() : $user->getId() . '@chiasenhac.com');
        $existUser = User::where('app_id', '=', $user->getId())->orWhere('email', '=', $email)->first();
        if(!$existUser) {
            $existUser = User::firstOrCreate([
                'name' => $user->getName(),
                'email' => $email,
                'user_active' => DEACTIVE_USER,
                'user_avatar' => $user->avatar_original,
                'app' => 'facebook',
//                'username' => $user->getId(),
                'app_id' => $user->getId(),
                'user_phone_number' => ''
            ]);
        }else{
            $existUser = $existUser;
        }
        Auth::login($existUser);
        return redirect(Session::get('redirect_flash') ?? '/');
    }
}