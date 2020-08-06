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

    public function __construct(RequestApiVipEloquentRepository $reqApiVip, UserEloquentRepository $userRepository, LogPageVipEloquentRepository $logPageVipRepository, UserLevelEloquentRepository $userLevelRepository)
    {
        $this->requestApiVip = $reqApiVip;
        $this->userRepository = $userRepository;
        $this->logPageVipRepository = $logPageVipRepository;
        $this->userLevelRepository = $userLevelRepository;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function saveUpRequest(Request $request)
    {
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
        $userID = trim(str_replace('csn', '', strtolower($request->note)));
        if(!is_numeric($userID)){
            $resultRequest->status = 'WRONG_NOTE';
            $resultRequest->save();
            return new JsonResponse(['message' => 'WRONG_NOTE', 'code' => 400, 'data' => [], 'error' => []]);
        }else{
            $user = $this->userRepository->getModel()::where('id', $userID)->first();
            if(!$user) {
                $resultRequest->status = 'NOT_FOUND_USER_ID';
                $resultRequest->save();
                return new JsonResponse(['message' => 'NOT_FOUND_USER_ID', 'code' => 400, 'data' => [], 'error' => []]);
            }
            $logPage = $this->logPageVipRepository->getModel()::where('user_id', $user->id)->first();
            if(!$logPage || ((time() - $logPage->time_log) > 86400)) { //trong 24h qua
                $resultRequest->status = 'NOT_MATCH_PAGE_LOG';
                $resultRequest->save();
                return new JsonResponse(['message' => 'NOT_MATCH_PAGE_LOG', 'code' => 400, 'data' => [], 'error' => []]);
            }
            $result = $this->userLevelRepository->upgradeUserLevel_v2($user->id, LEVEL_ID_DEFAULT_VIP_1_60DAY, '', '',  0, $resultRequest->id);
            if(!$result['success']) {
                $resultRequest->status = 'ERROR';
                $resultRequest->note = $result['msg'];
                $resultRequest->save();
                return new JsonResponse(['message' => $result['msg'], 'code' => 400, 'data' => [], 'error' => []]);
            }
            // success
            $resultRequest->status = 'SUCCESS';
            $resultRequest->save();
            return new JsonResponse(['message' => 'Success', 'code' => 200, 'data' => [], 'error' => []]);

        }
    }
}
