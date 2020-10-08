<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/17/2018
 * Time: 3:38 PM
 */
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request as Request;
use Illuminate\Support\Facades\Auth;
use App\Library\Helpers;
use Jenssegers\Agent\Agent;
use App\Repositories\ReportComment\ReportCommentRepository;
use App\Repositories\ReportMusic\ReportMusicRepository;
use App\Repositories\Contact\ContactEloquentRepository;
use App\Http\Controllers\Controller;
use \Illuminate\Http\JsonResponse;
use App\Repositories\User\UserEloquentRepository;
use App\Repositories\Session\SessionEloquentRepository;

class ReportController extends Controller
{
    protected $reportCommentRepository;
    protected $reportMusicRepository;
    protected $contactRepository;
    protected $sessionRepository;
    protected $userRepository;

    public function __construct(ReportCommentRepository $reportCommentRepository, ReportMusicRepository $reportMusicRepository, ContactEloquentRepository $contactRepository, SessionEloquentRepository $sessionRepository, UserEloquentRepository $userRepository) {
        $this->reportCommentRepository = $reportCommentRepository;
        $this->reportMusicRepository = $reportMusicRepository;
        $this->contactRepository = $contactRepository;
        $this->sessionRepository = $sessionRepository;
        $this->userRepository = $userRepository;
    }
    public function reportComment(Request $request)
    {
        if (!$request->sid || !$request->comment_id || !$request->music_id || !$request->type || !$request->comment_text || !$request->report_option || !$request->music_name || !$request->url_music) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Vui lòng nhập đầy đủ thông tin.'], 400);
        }
        $userSess = $this->sessionRepository->getSessionById($request->sid);
        if (!$userSess) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Bạn chưa đang nhập.'], 400);
        }
        $user = $this->userRepository->getModel()::where('id', $userSess->user_id)->first();
        if (!$user) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Không Tìm Thấy User'], 400);
        }
        // check banned user
        if ($user->hasPermissionsExtra('banned_user_report_comment')) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Lỗi truy cập, tài khoản bạn bị khóa chức năng thêm nhạc vào playlist.'], 400);
        }
        if(time() < ($user->user_regdate + SHORT_TIME_1_DAY)) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Tài khoản bạn cần hoạt động ít nhất 1 ngày'], 400);
        }
        $countStatus = $this->reportCommentRepository->getModel()::where('by_user_id', $user->id)->where('status', 0)->count();
        if($countStatus > MAX_SEND_REPORT) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Lỗi, Các báo cáo trước của bạn đang được xử lý'], 400);
        }
        $exits = $this->reportCommentRepository->getModel()::where([['comment_id', $request->comment_id], ['by_user_id', $user->id]])->first();
        if(!$exits) {
            $Agent = new Agent();
            $reportText = [];
            if($request->report_text) {
                $reportText = [
                    time() => [
                        'user' => ['time' => time(),
                            'user_id' => $user->id,
                            'content' => $request->report_text,
                        ]
                    ]
                ];
            }
            $this->reportCommentRepository->getModel()::create([
                'comment_id' => $request->comment_id,
                'comment_type' => $request->type,
                'music_name' => $request->music_name,
                'report_option' => $request->report_option,
                'music_id' => $request->music_id,
                'report_text' => serialize($reportText),
                'comment_text' => $request->comment_text,
                'by_user_id' => $user->id,
                'username' => $user->name,
                'ip' => Helpers::getIp(),
                'mod' => $Agent->isMobile() ? 'mobile' : 'web',
                'url_music' => $request->url_music,
                'link_file_jw' => $request->link_file_jw ?? '',
            ]);
            return new JsonResponse(['message' => 'Báo cáo của bạn đã được gửi đến quản trị', 'code' => 200, 'data' => [], 'error' => ''], 200);
        }else{
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Bạn đã báo cáo bình luận này rồi'], 400);
        }
    }
    public function reportMusic(Request $request)
    {

        if (!$request->sid || !$request->music_id || !$request->report_option || !$request->music_name || !$request->url_music) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Vui lòng nhập đầy đủ thông tin.'], 400);
        }
        $userSess = $this->sessionRepository->getSessionById($request->sid);
        if (!$userSess) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Bạn chưa đang nhập.'], 400);
        }
        $user = $this->userRepository->getModel()::where('id', $userSess->user_id)->first();
        if (!$user) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Không Tìm Thấy User'], 400);
        }
        // check banned user
        if ($user->hasPermissionsExtra('banned_user_report_music')) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Lỗi truy cập, tài khoản bạn bị khóa chức năng thêm nhạc vào playlist.'], 400);
        }
        if(time() < ($user->user_regdate + SHORT_TIME_1_DAY)) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Tài khoản bạn cần hoạt động ít nhất 1 ngày'], 400);
        }
        $countStatus = $this->reportMusicRepository->getModel()::where('by_user_id', $user->id)->where('status', 0)->count();
        if($countStatus > MAX_SEND_REPORT) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Lỗi, Các báo cáo trước của bạn đang được xử lý'], 400);
        }
        $exits = $this->reportMusicRepository->getModel()::where([['music_id', $request->id], ['by_user_id', $user->id]])->first();
        if(!$exits) {
            $Agent = new Agent();
            $reportText = [];
            if($request->report_text) {
                $reportText = [
                    time() => [
                        'user' => ['time' => time(),
                            'user_id' => $user->id,
                            'content' => $request->report_text,
                        ]
                    ]
                ];
            }
            $this->reportMusicRepository->getModel()::create([
                'music_id' => $request->music_id,
                'music_name' => $request->music_name,
                'report_option' => $request->report_option,
                'report_text' => serialize($reportText),
                'by_user_id' => $user->id,
                'username' => $user->name,
                'ip' => Helpers::getIp(),
                'mod' => $Agent->isMobile() ? 'mobile' : 'web',
                'url_music' => $request->url_music,
                'link_file_jw' => $request->link_file_jw ?? '',

            ]);
            return new JsonResponse(['message' => 'Báo cáo của bạn đã được gửi đến quản trị', 'code' => 200, 'data' => [], 'error' => ''], 200);
        }else{
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Bạn đã báo cáo nhạc này rồi'], 400);
        }
    }
    public function sendContact(Request $request) {
        if(strlen($request->email) < 5 || strlen($request->text) < 5 || strlen($request->text) > 5000) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Vui lòng nhập nội dung đầy đủ'], 400);
        }
        if(strlen($request->text) > 5000 || strlen($request->email) > 200) {
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Email không quá 200 ký tự, Nội dung không quá 5000 ký tự'], 400);
        }
        $Agent = new Agent();
        $ip = Helpers::getIp();
        $checkExit = $this->contactRepository->getModel()::where('ip', $ip)->orderBy('id', 'desc')->first();
        if($checkExit && (time() < strtotime($checkExit->created_at) + (60 * 5))){
            return new JsonResponse(['message' => 'Fail', 'code' => 400, 'data' => [], 'error' => 'Góp ý bạn đang xử lý, vui lòng thao tác chậm lại'], 400);
        }
        $this->contactRepository->getModel()::create([
            'email' => $request->email,
            'text' => $request->text,
            'ip' => $ip,
            'mod' => $Agent->isMobile() ? 'mobile' : 'web'
        ]);
        return new JsonResponse(['message' => 'Cảm ơn bạn đã góp ý kiến, chúng tôi sẽ trả lời sớm nhất.', 'code' => 200, 'data' => [], 'error' => ''], 200);
    }
}