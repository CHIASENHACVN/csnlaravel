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
use App\Library\Helpers;
use App\Solr\Solarium;
use App\Repositories\Category\CategoryEloquentRepository;
use App\Models\ErrorBugSlowModel;
use Jenssegers\Agent\Agent;
use App\Repositories\MessageUser\MessageUserEloquentRepository;

class RegisterVIPController extends Controller
{
    protected $userMessageRepository;

    public function __construct(MessageUserEloquentRepository $userMessageRepository)
    {
        $this->userMessageRepository = $userMessageRepository;
    }
    public function index(Request $request) {
        return view('registerVIP');
    }
    public function sendReportRegVip(Request $request) {
        $text = 'Báo cáo đăng ký nạp VIP
<br/>id_momo: '. $request->id_momo_request . '
<br/>Nội dung đã nạp: '.$request->content_request. '
<br/>Khoản thời gian đã nạp: '.$request->time_request;
        $result = $this->userMessageRepository->addMsg($text, Auth::user()->id, Auth::user()->user_name);
        return redirect()->route('vip.home', [])->with(['success' => 'Đã gửi báo cáo đăng ký VIP']);
    }
}