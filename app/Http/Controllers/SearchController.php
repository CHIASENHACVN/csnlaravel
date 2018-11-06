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

class SearchController extends Controller
{
    protected $categoryListenRepository;
    protected $musicRepository;
    protected $Solr;

    public function __construct(CategoryEloquentRepository $categoryListenRepository, Solarium $Solr, MusicEloquentRepository $musicRepository) {
        $this->categoryListenRepository = $categoryListenRepository;
        $this->musicRepository = $musicRepository;
        $this->Solr = $Solr;
    }
    public function index(Request $request) {
        $search = mb_strtolower($request->q, 'UTF-8');
        $request->view_music = true;
        $request->view_album = true;
        $request->view_video = true;
        $result = $this->ajaxSearch($request, false);
        $titleSearch = $search.' | ';
        $result = $result[0];
        if(!$search)
            return redirect('/');
        return view('search.index', compact('result', 'titleSearch', 'search', 'result'));
    }
    public function ajaxSearch(Request $request, $quickSearch = true) {
        $search = trim(mb_strtolower($request->q, 'UTF-8'));
        $searchExp = explode(' ', $search);
        foreach ($searchExp as $key => $item) {
            if(mb_detect_encoding($item) != 'UTF-8')
                unset($searchExp[$key]);
        }
        $searchNotUtf8 = implode('+', $searchExp);
        $result[0] = [
            'q' =>  $search,
            'music' => [
                'data' => []
            ],
            'video' => [
                'data' => []
            ],
            'artist' => [
                'data' => []
            ],
            'album' => [
                'data' => []
            ],
        ];
        if($search) {
            $charsetNoSapce = Helpers::rawTiengVietUrl($search, ''). '*^50';
            $titleCharset = Helpers::rawTiengVietUrl($search, '+') . '^2';
            $titleSearch = $searchNotUtf8;
            if(isset($request->view_all) || isset($request->view_music)) {
                $searchSolarium = [];
                if($quickSearch) {
                    $searchSolarium['music_title_charset_nospace'] =  $charsetNoSapce;
                }
                $searchSolarium['music_title_charset'] = $titleCharset;
                $searchSolarium['music_title'] = $titleSearch;
                $resultMusic = $this->Solr->search($searchSolarium, ($request->page_music ?? 1), $request->rows ?? ROWS_MUSIC_SEARCH_PAGING, array('score' => 'desc','music_listen' => 'desc'));
                if($resultMusic['data']) {
                    foreach ($resultMusic['data'] as $item) {
                        $result[0]['music']['data'][] = [
                            'music_title' => $item['music_title'][0],
                            'music_artist' => $item['music_artist'][0],
                            'music_bitrate' => $item['music_bitrate'][0],
                            'music_link' => $item['music_link'][0],
                            'music_listen' => $item['music_listen'][0],
                            'music_filename' => '', //$item['music_file_name'][0]
                            'music_cover' => $item['music_cover'][0],
                        ];
                    }
                }
                $result[0]['music']['rows'] = $resultMusic['rows'];
                $result[0]['music']['page'] = $resultMusic['page'];
                $result[0]['music']['row_total'] = $resultMusic['row_total'];
            }
            if(isset($request->view_all) || isset($request->view_artist)) {
                $searchSolarium = [];
                if($quickSearch) {
                    $searchSolarium['artist_nickname_charset_nospace'] =  $charsetNoSapce;
                }
                $searchSolarium['artist_nickname_charset'] = $titleCharset;
                $searchSolarium['artist_nickname'] = $titleSearch;
                $resultArtist = $this->Solr->search($searchSolarium, ($request->page_artist ?? 1), $request->rows ?? ROWS_ARTIST_SEARCH_PAGING, array('score' => 'desc'));
                if($resultArtist['data']) {
                    foreach ($resultArtist['data'] as $item) {
                        $result[0]['artist']['data'][] = [
                            'artist_nickname' => $item['artist_nickname'][0],
                            'artist_link' =>  $item['artist_link'][0],
                            'artist_cover' => isset($item['artist_cover']) ? $item['artist_cover'][0] : 'https://zmp3-photo.zadn.vn/thumb/240_240/covers/c/5/c57f754298fb51e7afa9802433166db0_1508817474.jpg'
                        ];
                    }
                }
                $result[0]['artist']['rows'] = $resultArtist['rows'];
                $result[0]['artist']['page'] = $resultArtist['page'];
                $result[0]['artist']['row_total'] = $resultArtist['row_total'];
            }
            if(isset($request->view_all) || isset($request->view_album)) {
                $resultAlbum = $this->Solr->search([
                    'music_album_charset' => $titleCharset,
                    'music_album' => $titleSearch,
                ], ($request->page_album ?? 1), $request->rows ?? ROWS_ALBUM_SEARCH_PAGING, array('score' => 'desc'));
                if($resultAlbum['data']) {
                    foreach ($resultAlbum['data'] as $item) {
                        $result[0]['album']['data'][] = [
                            'music_album' => $item['music_album'][0],
                            'album_link' => $item['album_link'][0],
                            'album_bitrate' => $item['music_bitrate'][0],
                            'album_artist' => isset($item['music_artist']) ? $item['music_artist'][0] : '',
                            'cover' => isset($item['cover']) ? $item['cover'][0] : '',
                        ];
                    }
                }
                $result[0]['album']['rows'] = $resultAlbum['rows'];
                $result[0]['album']['page'] = $resultAlbum['page'];
                $result[0]['album']['row_total'] = $resultAlbum['row_total'];
            }
            if(isset($request->view_all) || isset($request->view_video)) {
                $searchSolarium = [];
                if($quickSearch) {
//                    $searchSolarium['video_title_charset_nospace'] =  $charsetNoSapce;
                }
                $searchSolarium['video_title_charset'] = $titleCharset;
                $searchSolarium['video_title'] = $titleSearch;
                $resultVideo = $this->Solr->search($searchSolarium, ($request->page_video ?? 1), $request->rows ?? ROWS_VIDEO_SEARCH_PAGING, array('score' => 'desc','video_listen' => 'desc'));
                if($resultVideo['data']) {
                    foreach ($resultVideo['data'] as $item) {
                        $result[0]['video']['data'][] = [
                            'video_title' => $item['video_title'][0],
                            'video_artist' => $item['video_artist'][0],
                            'video_bitrate' => $item['video_bitrate'][0],
                            'video_link' => $item['video_link'][0],
                            'video_cover' => isset($item['video_cover']) ? $item['video_cover'][0] : '',
                            'video_listen' => $item['video_listen_total'][0],
                        ];
                    }
                }
                $result[0]['video']['rows'] = $resultVideo['rows'];
                $result[0]['video']['page'] = $resultVideo['page'];
                $result[0]['video']['row_total'] = $resultVideo['row_total'];
            }
        }
        return ($request->type == 'json' ? response((array)$result) : $result);
    }

}