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
use App\Library\Helpers;
use App\Solr\Solarium;
use App\Repositories\Artist\ArtistRepository;
use App\Models\ArtistModel;
use App\Repositories\Music\MusicEloquentRepository;
use App\Repositories\Video\VideoEloquentRepository;
use App\Repositories\Cover\CoverEloquentRepository;
use App\Repositories\PlaylistPublisher\PlaylistPublisherEloquentRepository;
use App\Repositories\ArtistFavourite\ArtistFavouriteRepository;
//use App\Repositories\ArtistSearchResult\ArtistSearchResultEloquentRepository;

class ArtistController extends Controller
{
    protected $artistRepository;
    protected $musicRepository;
    protected $videoRepository;
    protected $coverRepository;
    protected $playlistPublisherRepository;
    protected $artistFavouriteRepository;
    protected $artistSearchResult;
    protected $Solr;

    public function __construct(ArtistRepository $artistRepository, MusicEloquentRepository $musicRepository, VideoEloquentRepository $videoRepository, CoverEloquentRepository $coverRepository,
                                PlaylistPublisherEloquentRepository $playlistPublisherRepository, ArtistFavouriteRepository $artistFavouriteRepository, Solarium $Solr) {
        $this->artistRepository = $artistRepository;
        $this->musicRepository = $musicRepository;
        $this->videoRepository = $videoRepository;
        $this->coverRepository = $coverRepository;
        $this->playlistPublisherRepository = $playlistPublisherRepository;
        $this->artistFavouriteRepository = $artistFavouriteRepository;
//        $this->artistSearchResult = $artistSearchResult;
        $this->Solr = $Solr;
    }

    public function getTermArtist(Request $request) {
        $result = array();
        if($request->input('term')) {
            $result = ArtistModel::searchArtist($request->input('term'));
        }
        foreach ($result as $item) {
            $item->name = htmlspecialchars_decode($item->name, ENT_QUOTES);
        }
        return response($result);
    }
    public function index(Request $request, $artistUrl) {

        if(strpos($artistUrl, '~') !== false) {
            // old URL artist
            $artistId = last(explode('~', $artistUrl));
            $artistId_key = str_replace(KEY_ID_ARTIST_ENCODE_URL, '', base64_decode($artistId));
            if(!is_numeric($artistId_key))
                return view('errors.404');
            $artistIdNew = Helpers::encodeID($artistId_key, 'ca-si');
            $urlRed = str_replace('~' . $artistId, '', $artistUrl);
            return redirect(str_replace($artistUrl, strtolower($urlRed).'-'.$artistIdNew, url()->current()));
        }
        $id = last(explode('-', $artistUrl));
        $urlArtist = substr(str_replace($id, '', $artistUrl), 0, -1);
        $artist = $this->artistRepository->find(Helpers::decodeID($id));
        if(!$artist) {
            return view('errors.404');
        }
        $urlOriginal = Helpers::artistUrl($artist->artist_id, $artist->artist_nickname);
        if(url()->current() != ENV('LISTEN_URL').substr($urlOriginal, 1)) {
            return redirect(ENV('LISTEN_URL').substr($urlOriginal, 1));
        }
        $music = $this->Solr->search(['music_artist_id' => $artist->artist_id], ($request->page ?? 1), LIMIT_MUSIC_PAGE_ARTIST, ['_version_' => 'desc']);
        $musicHtml =  view('artist.music_item', compact('music'));
        $artistFavourite = false;
        if(Auth::check())
            $artistFavourite = $this->artistFavouriteRepository->getModel()::where([['user_id', Auth::user()->id], ['artist_id', $artist->artist_id]])->first();
        return view('artist.index', compact('artist', 'musicHtml', 'artistFavourite', 'artistUrl'));
    }
    public function getTabArtist(Request $request) {
        switch ($request->tab) {
            case "music":
                $music = $this->Solr->search(['music_artist_id' => $request->artist_id], $request->page ?? 1, LIMIT_MUSIC_PAGE_ARTIST, ['_version_' => 'desc']);
                return view('artist.music_item', compact('music'));
                break;
            case "video":
                $video = $this->Solr->search(['video_artist_id' => $request->artist_id], $request->page ?? 1, LIMIT_MUSIC_PAGE_ARTIST, ['_version_' => 'desc']);
                return view('artist.video_item', compact('video'));
                break;
            case "album":
                $cover = $this->Solr->search(['album_music_artist_id' => $request->artist_id], $request->page ?? 1, LIMIT_MUSIC_PAGE_ARTIST, ['_version_' => 'desc']);
                return view('artist.cover_item', compact('cover'));
                break;
            case "playlist":
                $playlist = $this->playlistPublisherRepository->getPlaylistPageByArtist($request->artist_id, 'playlist_artist_id', 'desc', LIMIT_MUSIC_PAGE_ARTIST);
                return view('artist.playlist_item', compact('playlist'));
                break;
            default:
                return view('errors.404');
        }
    }
    public function favorite(Request $request) {
        $dataRes = null;
        if(!Auth::check())
            Helpers::ajaxResult(false, 'Chưa đăng nhập', null);
        if($request->type == 'true'){
            $msg = 'Đã bỏ ca sĩ '.$request->name.' ra khỏi danh sách yêu thích.';
            $dataRes = [];
            $this->artistFavouriteRepository->getModel()::where([['user_id', Auth::user()->id], ['artist_id', $request->artist_id]])->delete();
        }else{
            $msg = 'Đã thêm ca sĩ '.$request->name.' vào danh sách yêu thích.';
            $this->artistFavouriteRepository->getModel()::firstOrCreate(['user_id' => Auth::user()->id, 'artist_id' => $request->artist_id]);
        }
        Helpers::ajaxResult(true, $msg, $dataRes);
    }
}