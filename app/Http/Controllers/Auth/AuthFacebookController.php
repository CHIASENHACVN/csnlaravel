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

class AuthFacebookController extends Controller
{

    /**
     * Redirect the user to the Github authentication page
     *
     * @return Response
     */
    public function redirectToProvider() {

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
        $existUser = User::where('app_id', '=', $user->getId())->get();
        if(!empty($existUser)) {
            $existUser = User::firstOrCreate([
                'name' => $user->getName(),
                'email' => $email,
                'user_avatar' => $user->avatar_original,
                'app' => 'facebook',
                'username' => $user->getId(),
                'app_id' => $user->getId(),
                'user_phone_number' => ''
            ]);
        }else{
            $existUser = $existUser[0];
        }
        Auth::login($existUser);
        return redirect('/');
    }
}