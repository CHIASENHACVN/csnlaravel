<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/21/2018
 * Time: 3:33 PM
 */

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Library\Helpers;
use App\Repositories\User\UserEloquentRepository;
use App\Repositories\Music\MusicEloquentRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Playlist\PlaylistEloquentRepository;
use App\Repositories\Album\AlbumEloquentRepository;
use App\Models\MailTokenModel;
use App\Repositories\Upload\UploadEloquentRepository;
use App\Repositories\ArtistFavourite\ArtistFavouriteRepository;
use App\Repositories\MusicFavourite\MusicFavouriteRepository;
use App\Repositories\VideoFavourite\VideoFavouriteRepository;

class UserMusicController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $userRepository;
    protected $musicRepository;
    protected $playlistRepository;
    protected $uploadRepository;
    protected $albumRepository;
    protected $artistFavouriteRepository;
    protected $musicFavouriteRepository;
    protected $videoFavouriteRepository;

    public function __construct(UserEloquentRepository $userRepository, PlaylistEloquentRepository $playlistRepository, MusicEloquentRepository $musicRepository,
                                UploadEloquentRepository $uploadRepository, AlbumEloquentRepository $albumRepository, ArtistFavouriteRepository $artistFavouriteRepository, MusicFavouriteRepository $musicFavouriteRepository,
                                VideoFavouriteRepository $videoFavouriteRepository)
    {
        $this->userRepository = $userRepository;
        $this->playlistRepository = $playlistRepository;
        $this->musicRepository = $musicRepository;
        $this->uploadRepository = $uploadRepository;
        $this->albumRepository = $albumRepository;
        $this->artistFavouriteRepository = $artistFavouriteRepository;
        $this->musicFavouriteRepository = $musicFavouriteRepository;
        $this->videoFavouriteRepository = $videoFavouriteRepository;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function musicUploaded(Request $request)
    {
        if(!Auth::check()) {
            return 'Lỗi User';
        }else{
            $id = Auth::user()->id;
            if(Auth::user()->hasPermission('duyet_nhac')) {
                $id = $request->user_id;
            }
        }
        $stage = $request->input('stage');


        if($stage == 'all' || $stage == 'uncensor') {
            // chờ xử lý
            $music['stage_uncensor'] = $this->uploadRepository->musicByUser($id,[UPLOAD_STAGE_UNCENSOR], 'music_last_update_time', 'desc', LIMIT_PAGE_MUSIC_UPLOADED);
        }
        if($stage == 'all' || $stage == 'fullcensor') {
            // đã duyệt
            $music['stage_fullcensor'] = $this->uploadRepository->musicByUser($id,[UPLOAD_STAGE_FULLCENSOR, UPLOAD_STAGE_FULLCONVERT], 'music_last_update_time', 'desc', LIMIT_PAGE_MUSIC_UPLOADED);
        }
        if($stage == 'all' || $stage == 'delete') {
            // đã xóa
            $music['stage_delete'] = $this->uploadRepository->musicByUser($id,[UPLOAD_STAGE_DELETED], 'music_last_update_time', 'desc', LIMIT_PAGE_MUSIC_UPLOADED);
        }
        if($stage == 'all' || $stage == 'album') {
            // album
            $music['album'] = $this->albumRepository->findAlbumByUser($id, 'album_id', 'desc', LIMIT_PAGE_MUSIC_UPLOADED);
        }
        return view('user.music_uploaded', compact('music', 'stage'));
    }
    public function musicUploadedRedirect(Request $request, $user_id, $music_id) {
//        , 'music_user_id' => $user_id
        $music = $this->musicRepository->getModel()::where(['music_id' => $music_id])->first();
        if($music) {
            $url = Helpers::listen_url($music->toArray());
            return redirect($url);
        }
        return view('errors.404');
    }
    public function musicRecent(Request $request) {
        $musics = [];
        if(isset($_COOKIE['music_history'])) {
            $musicHistory = array_reverse(unserialize($_COOKIE['music_history']));
            $tempStr = implode(',', $musicHistory);
            $musics = $this->musicRepository->getHistoryRecents($tempStr);
        }
        return view('user.music_recents', compact('musics'));
    }
    public function artistFavourite(Request $request) {
        $artistFavourite = $this->artistFavouriteRepository->getModel()::where('user_id', $request->user_id)->with('artist')->orderBy('id', 'desc')->paginate(LIMIT_PAGE_ARTIST_FAVOURITE);
        return view('user.artist_favourite', compact('artistFavourite'));
    }
    public function videoFavourite(Request $request) {
        $videoFavourite = $this->videoFavouriteRepository->getModel()::where('user_id', $request->user_id)->with('video')->orderBy('id', 'desc')->paginate(LIMIT_PAGE_MUSIC_FAVOURITE);
        return view('user.video_favourite', compact('videoFavourite'));
    }
    public function musicFavourite(Request $request) {
        $musicFavourite = $this->musicFavouriteRepository->getModel()::where('user_id', $request->user_id)->with('music')->orderBy('id', 'desc')->paginate(LIMIT_PAGE_MUSIC_FAVOURITE);
        return view('user.music_favourite', compact('musicFavourite'));
    }

}
