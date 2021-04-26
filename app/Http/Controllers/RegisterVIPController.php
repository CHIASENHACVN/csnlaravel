<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/17/2018
 * Time: 3:38 PM
 */
namespace App\Http\Controllers;
use Illuminate\Http\Request as Request;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Music\MusicEloquentRepository;
use App\Repositories\LogPageVip\LogPageVipEloquentRepository;
use App\Library\Helpers;
use App\Solr\Solarium;
use App\Repositories\Category\CategoryEloquentRepository;
use App\Models\ErrorBugSlowModel;
use Jenssegers\Agent\Agent;
use App\Repositories\MessageUser\MessageUserEloquentRepository;

class RegisterVIPController extends Controller
{
    protected $userMessageRepository;
    protected $logPageVipRepository;

    public function __construct(MessageUserEloquentRepository $userMessageRepository, LogPageVipEloquentRepository $logPageVipRepository)
    {
        //abort(403, 'Xin lỗi bạn, chức năng này đang tạm ngưng hoạt động trong vài ngày để nâng cấp.');
        $this->userMessageRepository = $userMessageRepository;
        $this->logPageVipRepository = $logPageVipRepository;
    }
    public function index(Request $request) {
        $logExist = $this->logPageVipRepository->getModel()::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->first();
        if(!$logExist || (time() - $logExist->time_log > 60)) {
            $this->logPageVipRepository->getModel()::create([
                'user_id' => Auth::user()->id,
                'ip' => Helpers::getIp(),
                'time_log' => time(),
            ]);
        }
        return view('registerVIP');
    }
    public function sendReportRegVip(Request $request) {
        if(strlen($request->id_phone_request) < 5 || strlen($request->id_phone_request) > 14) {
            return redirect()->route('vip.home', [])->with(['error' => 'Lỗi số điện thoại không đúng']);
        }
        if(strlen($request->amount_request) < 5 || strlen($request->amount_request) > 14) {
            return redirect()->route('vip.home', [])->with(['error' => 'Lỗi tiền nạp không đúng']);
        }
        if(strlen($request->message_request) > 2000) {
            return redirect()->route('vip.home', [])->with(['error' => 'Lỗi mã ghi chú quá dài']);
        }
        $text = 'Báo cáo nạp VIP: '.$request->message_request .'
<br/>Số ĐT: '. $request->id_phone_request . '
<br/>Đã nạp: '. number_format($request->amount_request). ' (vnđ)
<br/>Lời chúc: '.$request->note_request. '
<br/>Khoảng thời gian đã nạp: '.  date('d/m/Y H:i', strtotime($request->time_request));
        $result = $this->userMessageRepository->addMsg($text, Auth::user()->id, Auth::user()->user_name);
        return redirect()->route('vip.home', [])->with(['success' => 'Đã gửi báo cáo đăng ký VIP']);
    }
    public function refreshRegVip(Request $request) {
        if(Auth::user()->vip_level > 0 && Auth::user()->vip_time_exprited > time()) {
            Helpers::ajaxResult(true, '', null);
        }
        Helpers::ajaxResult(false, '', null);
    }
}