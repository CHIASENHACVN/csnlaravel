<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/21/2018
 * Time: 3:33 PM
 */

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Library\Helpers;
use App\Repositories\User\UserEloquentRepository;
use Illuminate\Support\Facades\Auth;
use App\Models\UserModel;
use App\Models\MailTokenModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Http\JsonResponse;
use App\Repositories\RequestApiVip\RequestApiVipEloquentRepository;
use App\Repositories\LogPageVip\LogPageVipEloquentRepository;
use App\Repositories\UserLevel\UserLevelEloquentRepository;
use App\Repositories\Level\LevelEloquentRepository;

class RequestPaymentVipController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $requestApiVip;
    protected $userRepository;
    protected $logPageVipRepository;
    protected $userLevelRepository;
    protected $levelRepository;

    public function __construct(RequestApiVipEloquentRepository $reqApiVip, UserEloquentRepository $userRepository, LogPageVipEloquentRepository $logPageVipRepository, UserLevelEloquentRepository $userLevelRepository,
                                LevelEloquentRepository $levelRepository)
    {
        $this->requestApiVip = $reqApiVip;
        $this->userRepository = $userRepository;
        $this->logPageVipRepository = $logPageVipRepository;
        $this->userLevelRepository = $userLevelRepository;
        $this->levelRepository = $levelRepository;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function saveUpRequest(Request $request)
    {
        if(!$request->title || !$request->name || !$request->code || !$request->phone || !$request->amount) {
            return new JsonResponse(['message' => 'Lỗi thiếu dữ liệu truyền vào', 'code' => 400, 'data' => null, 'error' => null]);
        }
        if($this->requestApiVip->getModel()::where('code', $request->code)->first()) {
            return new JsonResponse(['message' => 'Trùng mã code', 'code' => 400, 'data' => null, 'error' => null]);
        }
        $resultRequest = $this->requestApiVip->getModel()::create([
            'title' => $request->title,
            'name' => $request->name,
            'code' => $request->code,
            'phone' => $request->phone,
            'note' => $request->note,
            'amount' => $request->amount,
            'time' => $request->time,
            'time_create' => time(),
        ]);
        $moneySend = (int)$request->amount;
        $levels = $this->levelRepository->getModel()::where('level_status', 1)->get();
        $level = null;
        foreach ($levels as $item) {
            if($item->level_money_promo_status && $item->level_money_promo == $moneySend) {
                $level = $item;
                break;
            }
            if(!$item->level_money_promo_status && $item->level_money == $moneySend) {
                $level = $item;
                break;
            }
        }
        if(!$level) {
            $resultRequest->status = 'WRONG_MONEY';
            $resultRequest->save();
            return new JsonResponse(['message' => 'WRONG_MONEY', 'code' => 400, 'data' => null, 'error' => null]);
        }
        $userID = trim(str_replace('csn', '', strtolower($request->note)));
        $userID = str_replace('cns', '', $userID);
        if(!is_numeric($userID)){
            $resultRequest->status = 'WRONG_NOTE';
            $resultRequest->save();
            return new JsonResponse(['message' => 'WRONG_NOTE', 'code' => 400, 'data' => null, 'error' => null]);
        }else{
            $user = $this->userRepository->getModel()::where('id', $userID)->first();
            if(!$user) {
                $resultRequest->status = 'NOT_FOUND_USER_ID';
                $resultRequest->save();
                return new JsonResponse(['message' => 'NOT_FOUND_USER_ID', 'code' => 400, 'data' => null, 'error' => null]);
            }
            $logPage = $this->logPageVipRepository->getModel()::where('user_id', $user->id)->orderBy('id', 'desc')->first();
            if(!$logPage || ((time() - $logPage->time_log) > 259200)) { //trong 74h qua
                $resultRequest->status = 'NOT_MATCH_PAGE_LOG';
                $resultRequest->save();
                return new JsonResponse(['message' => 'NOT_MATCH_PAGE_LOG', 'code' => 400, 'data' => null, 'error' => null]);
            }
            $result = $this->userLevelRepository->upgradeUserLevel_v2($user->id, $level->level_id, '', '',  0, $resultRequest->id);
            if(!$result['success']) {
                $resultRequest->status = 'ERROR';
                $resultRequest->note = $result['msg'];
                $resultRequest->save();
                return new JsonResponse(['message' => $result['msg'], 'code' => 400, 'data' => null, 'error' => null]);
            }
            // success
            $resultRequest->status = 'SUCCESS';
            $resultRequest->save();
            return new JsonResponse(['message' => 'Success', 'code' => 200, 'data' => ['user_id' => $user->user_id, 'username' => $user->username, 'level_id' => $level->id, 'level_name' => $level->level_name], 'error' => null]);

        }
    }
}
