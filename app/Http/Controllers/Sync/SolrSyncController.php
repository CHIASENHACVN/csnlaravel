<?php

/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/17/2018
 * Time: 3:38 PM
 */

namespace App\Http\Controllers\Sync;
ini_set('memory_limit', '-1');

use App\Http\Controllers\Controller;
use Illuminate\Http\Request as Request;
use Illuminate\Support\Facades\Auth;
use App\Library\Helpers;
use App\Models\MusicModel;
use App\Models\UploadModel;
use App\Models\MusicSolrModel;
use App\Models\VideoModel;
use App\Models\CoverModel;
use App\Solr\Solarium;
use App\Models\ArtistModel;
use App\Repositories\Music\MusicEloquentRepository;
use DB;

class SolrSyncController extends Controller
{
    protected $Solr;

    public function __construct(Solarium $Solr) {
        $this->Solr = $Solr;
    }
    public function ping() {
        return $this->Solr->ping();
    }

    public function syncMusic($id = null, $musicItem = null, $time = null) {
        if($id) {
            $searchMusic = MusicModel::select('music_id', 'music_composer', 'music_title', 'music_artist', 'music_downloads_this_week',
                'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_artist_id', 'music_album', 'music_listen', 'music_downloads', 'music_filename', 'music_bitrate', 'music_downloads_today', 'music_downloads_max_week', 'music_downloads_this_week', 'music_lyric')
                ->where('cat_id', '!=', CAT_VIDEO)
                ->where('music_deleted', '<', 1)
                ->orderBy('music_id', 'asc')
                ->where('music_id', $id)
                ->get();
        }elseif($musicItem){
            if(is_array($musicItem)){
                $searchMusic = $musicItem;
            }else{
                $searchMusic[] = $musicItem;
            }
        }elseif($time) {
            $searchMusic = MusicModel::select('music_id', 'music_composer', 'music_title', 'music_artist', 'music_downloads_this_week',
                'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_artist_id', 'music_album', 'music_listen', 'music_downloads', 'music_filename', 'music_bitrate', 'music_downloads_today', 'music_downloads_max_week', 'music_downloads_this_week', 'music_lyric')
                ->where('cat_id', '!=', CAT_VIDEO)
                ->where('music_deleted', '<', 1)
                ->orderBy('music_id', 'asc')
                ->where('music_last_update_time', '>',  $time)
                ->get();
        }else{
            $searchMusic = MusicModel::select('music_id', 'music_composer', 'music_title', 'music_artist', 'music_downloads_this_week',
                'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_artist_id', 'music_album', 'music_listen', 'music_downloads', 'music_filename', 'music_bitrate', 'music_downloads_today', 'music_downloads_max_week', 'music_downloads_this_week', 'music_lyric')
                ->where('cat_id', '!=', CAT_VIDEO)
                ->where('music_deleted', '<', 1)
                ->where('music_id', '>', intval($_GET['m_start']))
//                ->whereIn('music_id', [1980711])
                ->offset(0)
                ->limit(5000)
                ->orderBy('music_id', 'asc')
                ->get();
        }
        DB::disconnect('mysql');

        //dd($searchMusic);
        $datas = [];
        foreach ($searchMusic as $key => $item) {
            $titleSearch = Helpers::replaceKeySearch($item->music_title);
            $artistSearch = Helpers::replaceKeySearch($item->music_artist);
            $titleCharset = Helpers::khongdau($titleSearch, ' ');
            $artistCharset = Helpers::khongdau($artistSearch, ' ');
            $lyricSearch = Helpers::replaceKeySearch($item->music_lyric);
            $lyricCharset = Helpers::khongdau(str_replace("\n", ' ', $lyricSearch), ' ');
            $data = [
                'id' => 'music_'.$item->music_id,
                'music_id' => $item->music_id,
                'music_title' => $item->music_title,
                'music_title_search' => $titleSearch,
                'music_artist_search' => $artistSearch,
//                'music_title_artist_search' => $titleSearch .' '. $artistSearch,
                'music_title_charset_nospace' => str_replace(' ', '', $titleCharset),
                'music_artist_charset_nospace' => str_replace(' ', '', $artistCharset),
                'music_title_artist_charset_nospace' => str_replace(' ', '', $titleCharset) . '' . str_replace(' ', '', $artistCharset),
                'music_title_charset' => $titleCharset,
                'music_artist_charset' => $artistCharset,
//                'music_title_artist_charset' => $titleCharset . ' '. $artistCharset,
//                'music_lyric' => $item->music_lyric,
//                'music_lyric_search' => $lyricSearch,
                'music_lyric_charset' => $lyricCharset,
                'music_bitrate_html' => Helpers::bitrate2str($item->music_bitrate),
                'music_cover' => Helpers::cover_url($item->cover_id),
                'music_link' => '/'.Helpers::listen_url($item->toArray(), false),
                'music_filename' => $item->music_filename,
                'music_artist' => $item->music_artist, //str_replace(';', ',', $item->music_artist),
                'music_artist_id' => explode(';', $item->music_artist_id),
                'music_artist_html' => Helpers::rawHtmlArtists($item->music_artist_id, $item->music_artist),
                'music_listen' => $item->music_listen,
                'cat_id' => $item->cat_id,
                'music_composer' => $item->music_composer,
                'cat_level' => $item->cat_level,
                'cover_id' => $item->cover_id,
                'music_bitrate' => $item->music_bitrate,
                'music_width' => $item->music_width,
                'music_height' => $item->music_height,
                'music_length' => $item->music_length,
                'music_downloads' => $item->music_downloads,
                'music_downloads_today' => $item->music_downloads_today,
                'music_downloads_this_week' => $item->music_downloads_this_week,
                'music_downloads_max_week' => $item->music_downloads_max_week,

            ];

            $datas[] = $data;
            //$datas[] = $data['id'];
            //$this->Solr->addDocuments($data);
            //$this->Solr->solrDeleteById($data['id']);

            if(Auth::check() && Auth::user()->id == 3) {
                echo ($key) . '/ ' . $item->music_id . "\n <br>";
            }
        }
        $this->Solr->addMultiDocuments($datas);
        //$this->Solr->solrMultiDeleteById($datas);

        if(Auth::check() && Auth::user()->id == 3) {
            if (sizeof($searchMusic) > 0) {
                die('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><script type="text/javascript">window.location = "?m_start=' . $item->music_id . '"; </script></head><body></body></html>');
            } else {
                die('Done! Full Data!');
            }
        }

        return response(['Ok']);
    }
    public function syncDeleteMusic($id = null, $musicItem = null) {
        //<delete><query>_id:12345323211</query></delete>
        if($id) {
            $searchMusic = MusicModel::select('music_id', 'music_composer', 'music_title', 'music_artist', 'music_downloads_this_week',
                'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_artist_id', 'music_album', 'music_listen', 'music_downloads', 'music_filename', 'music_bitrate', 'music_downloads_today', 'music_downloads_max_week', 'music_downloads_this_week', 'music_lyric')
                ->where('cat_id', '!=', CAT_VIDEO)
                ->where('music_id', $id)
                ->get();
        }elseif($musicItem){
            if(is_array($musicItem)){
                $searchMusic = $musicItem;
            }else{
                $searchMusic[] = $musicItem;
            }
        }else {
            $searchMusic = UploadModel::select('music_id')
                ->where('cat_id', '!=', CAT_VIDEO)
                ->where('music_state', '=', -1)
                ->where('music_id', '>', intval($_GET['m_start']))
//                ->whereIn('music_id', [1603231,1602966,1603110])
                ->offset(0)
                ->limit(5000)
                ->orderBy('music_id', 'asc')
                ->get();

            $searchMusic = MusicModel::select('music_id')
                ->where('cat_id', '!=', CAT_VIDEO)
                ->where('music_deleted', '>', 1)
                ->where('music_id', '>', intval($_GET['m_start']))
//                ->whereIn('music_id', [1603231,1602966,1603110])
                ->offset(0)
                ->limit(5000)
                ->orderBy('music_id', 'asc')
                ->get();
        }
        DB::disconnect('mysql');

        //dd($searchMusic);
        $datas = [];
        foreach ($searchMusic as $key => $item) {
            $data = [
                'id' => 'music_'.$item->music_id,
            ];

            //$datas[] = $data;
            $datas[] = $data['id'];
            //$this->Solr->addDocuments($data);
            //$this->Solr->solrDeleteById($data['id']);
            if(Auth::check() && Auth::user()->id == 3)
                echo ($key) . '/ ' . $item->music_id . "\n <br>";
        }
        //$this->Solr->addMultiDocuments($datas);
        $this->Solr->solrMultiDeleteById($datas);
        if(Auth::check() && Auth::user()->id == 3) {
            if (sizeof($searchMusic) > 0)
            {
                die('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><script type="text/javascript">window.location = "?m_start='. $item->music_id .'"; </script></head><body></body></html>');
            }
            else{
                die('Done! Full Data!');
            }
        }
        return response(['Ok']);
    }
    public function syncVideo($id = null, $videoItem = null, $time = null) {
        if($id) {
            $searchVideo = VideoModel::select('music_id', 'music_title_search', 'music_artist_search', 'music_composer', 'music_album_search', 'music_title', 'music_artist', 'music_downloads_this_week',
                'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_title_url', 'music_artist_id', 'music_album', 'music_listen', 'music_downloads', 'music_filename', 'music_bitrate', 'music_downloads_today', 'music_downloads_max_week', 'music_width', 'music_height', 'music_last_update_time', 'music_length', 'music_time')
                ->where('cat_id', '=', CAT_VIDEO)
                ->where('music_deleted', '<', 1)
                ->where('music_id', $id)
                ->orderBy('music_id', 'asc')
                ->get();
        }elseif($videoItem){
            if(is_array($videoItem)){
                $searchVideo = $videoItem;
            }else{
                $searchVideo[] = $videoItem;
            }
        }elseif($time){
            $searchVideo = VideoModel::select('music_id', 'music_title_search', 'music_artist_search', 'music_composer', 'music_album_search', 'music_title', 'music_artist', 'music_downloads_this_week',
                'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_title_url', 'music_artist_id', 'music_album', 'music_listen', 'music_downloads', 'music_filename', 'music_bitrate', 'music_downloads_today', 'music_downloads_max_week', 'music_width', 'music_height', 'music_last_update_time', 'music_length', 'music_time')
                ->where('cat_id', '=', CAT_VIDEO)
                ->where('music_deleted', '<', 1)
                ->where('music_last_update_time', '>',  $time)
                ->orderBy('music_id', 'asc')
                ->get();
        }else {
            $searchVideo = VideoModel::select('music_id', 'music_title_search', 'music_artist_search', 'music_composer', 'music_album_search', 'music_title', 'music_artist', 'music_downloads_this_week',
                'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_title_url', 'music_artist_id', 'music_album', 'music_listen', 'music_downloads', 'music_filename', 'music_bitrate', 'music_downloads_today', 'music_downloads_max_week', 'music_width', 'music_height', 'music_last_update_time', 'music_length', 'music_time')
                ->where('cat_id', '=', CAT_VIDEO)
//                ->where('music_id', '=', 1988018)
                ->where('music_deleted', '<', 1)
                ->where('music_id', '>', intval($_GET['v_start']))
//                ->whereIn('music_id', [1603231,1602966,1603110])
                ->offset(0)
                ->limit(5000)
                ->orderBy('music_id', 'asc')
                ->get();
        }
        DB::disconnect('mysql');
        $datas = [];
        foreach ($searchVideo as $key => $item) {
            $titleSearch = Helpers::replaceKeySearch($item->music_title);
            $artistSearch = Helpers::replaceKeySearch($item->music_artist);
            $titleCharset = Helpers::khongdau($titleSearch, ' ');
            $artistCharset = Helpers::khongdau($artistSearch, ' ');
            $data = [
                'id' => 'video_'.$item->music_id,
                'video_id' => $item->music_id,
                'video_title' => $item->music_title,
                'video_title_search' => $titleSearch,
                'video_artist_search' => $artistSearch,
//                'video_title_artist_search' => $titleSearch .' '. $artistSearch,
                'video_title_charset_nospace' => str_replace(' ', '', $titleCharset),
                'video_artist_charset_nospace' => str_replace(' ', '', $artistCharset),
                'video_title_artist_charset_nospace' => str_replace(' ', '', $titleCharset) .''. str_replace(' ', '', $artistCharset),
                'video_title_charset' => $titleCharset,
                'video_artist_charset' => $artistCharset,
//                'video_title_artist_charset' => $titleCharset .' '. $artistCharset,
                'video_bitrate_html' => Helpers::size2str($item->music_width, $item->music_height),//, false, true),
                'video_width' => $item->music_width,
                'video_height' => $item->music_height,
                'video_cover' => Helpers::thumbnail_url($item->toArray()),
                'video_link' => '/'.Helpers::listen_url($item->toArray(), false),
                'video_filename' => $item->music_filename,
                'video_artist' => $item->music_artist, //str_replace(';', ',', $item->music_artist),
                'video_artist_id' => explode(';', $item->music_artist_id),//$item->music_artist_id, //str_replace(';', ',', $item->music_artist_id),
                'video_artist_html' => Helpers::rawHtmlArtists($item->music_artist_id, $item->music_artist),
                'video_listen' => $item->music_listen,
                'cat_id' => $item->cat_id,
                'cat_level' => $item->cat_level,
                'video_composer' => $item->music_composer,
                'cover_id' => $item->cover_id,
                'video_bitrate' => $item->music_bitrate,
                'video_length' => $item->music_length,
                'video_length_html' => $item->music_length >= 3600 ? gmdate("H:i:s", $item->music_length) : gmdate("i:s", $item->music_length),
                'video_downloads' => $item->music_downloads,
                'video_downloads_today' => $item->music_downloads_today,
                'video_downloads_this_week' => $item->music_downloads_this_week,
                'video_downloads_max_week' => $item->music_downloads_max_week,
            ];
            $datas[] = $data;
//            $this->Solr->addDocuments($data);

            if(Auth::check() && Auth::user()->id == 3) {
                echo ($key) . '/ ' . $item->music_id . "\n <br>";
            }
        }
        $this->Solr->addMultiDocuments($datas);

        if(Auth::check() && Auth::user()->id == 3) {
            if (sizeof($searchVideo) > 0) {
                die('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><script type="text/javascript">window.location = "?v_start=' . $item->music_id . '"; </script></head><body></body></html>');
            } else {
                die('Done! Full Data!');
            }
        }

        return response(['Ok']);
    }
    public function syncDeleteVideo($id = null, $videoItem = null) {
        if($id) {
            $searchVideo = VideoModel::select('music_id')
                ->where('cat_id', '=', CAT_VIDEO)
                ->where('music_id', $id)
                ->get();
        }elseif($videoItem){
            if(is_array($videoItem)){
                $searchVideo = $videoItem;
            }else{
                $searchVideo[] = $videoItem;
            }
        }else {
            $searchVideo = UploadModel::select('music_id')
                ->where('cat_id', '=', CAT_VIDEO)
                ->where('music_state', '=', -1)
                ->where('music_id', '>', intval($_GET['v_start']))
//                ->whereIn('music_id', [1603231,1602966,1603110])
                ->offset(0)
                ->limit(5000)
                ->orderBy('music_id', 'asc')
                ->get();

            $searchVideo = VideoModel::select('music_id')
                ->where('cat_id', '=', CAT_VIDEO)
                ->where('music_deleted', '>', 1)
                ->where('music_id', '>', intval($_GET['v_start']))
//                ->whereIn('music_id', [1603231,1602966,1603110])
                ->offset(0)
                ->limit(5000)
                ->orderBy('music_id', 'asc')
                ->get();
        }
        DB::disconnect('mysql');

        //dd($searchMusic);
        $datas = [];
        foreach ($searchVideo as $key => $item) {
            $data = [
                'id' => 'video_'.$item->music_id,
            ];

            //$datas[] = $data;
            $datas[] = $data['id'];
            //$this->Solr->addDocuments($data);
            //$this->Solr->solrDeleteById($data['id']);
            if(Auth::check() && Auth::user()->id == 3) {
                echo ($key) . '/ ' . $item->music_id . "\n <br>";
            }
        }
        //$this->Solr->addMultiDocuments($datas);
        $this->Solr->solrMultiDeleteById($datas);
        if(Auth::check() && Auth::user()->id == 3) {
            if (sizeof($searchVideo) > 0)
            {
                die('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><script type="text/javascript">window.location = "?v_start='. $item->music_id .'"; </script></head><body></body></html>');
            }
            else{
                die('Done! Full Data!');
            }
        }
        return response(['Ok']);
    }
    public function syncArtist($id = null, $artistItem = null, $time = null) {
        if($id) {
            $artist = ArtistModel::where('artist_id', $id)->get();
        }elseif($artistItem){
            if(is_array($artistItem)){
                $artist = $artistItem;
            }else{
                $artist[] = $artistItem;
            }
        }elseif($time){
            $artist = ArtistModel::where('music_last_update_time', '>',  $time)->get();
        }else {
            $artist = ArtistModel::offset(0)->limit(130000)->get();
        }
        DB::disconnect('mysql');
        $datas = [];
        foreach ($artist as $key => $item) {
            $artist_nickname_charset = Helpers::khongdau(mb_strtolower($item->artist_nickname, 'UTF-8'), ' ');
            $data = [
                'id' => 'artist_'.$item->artist_id,
                'artist_nickname' => $item->artist_nickname,
                'artist_nickname_search' => Helpers::replaceKeySearch($item->artist_nickname),
                'artist_nickname_charset' => Helpers::replaceKeySearch($artist_nickname_charset),
                'artist_nickname_charset_nospace' => Helpers::replaceKeySearch(str_replace(' ', '', $artist_nickname_charset)),
                'music_total' => $item->music_total,
                'artist_link' => Helpers::artistUrl($item->artist_id, $item->artist_nickname),
                'artist_cover' => $item->artist_cover ? Helpers::file_path($item->artist_id, PUBLIC_COVER_ARTIST_PATH, true).$item->artist_cover : '/imgs/no_cover_artist.jpg',
                'artist_avatar' => $item->artist_avatar ? Helpers::file_path($item->artist_id, PUBLIC_AVATAR_ARTIST_PATH, true).$item->artist_avatar : '/imgs/no_cover.jpg',
            ];
            $datas[] = $data;
//            $this->Solr->addDocuments($data);

            if(Auth::check() && Auth::user()->id == 3) {
                echo ($key) . '/ ' . $item->artist_id . "\n <br>";
            }
        }
        $this->Solr->addMultiDocuments($datas);

        return response(['Ok']);
    }
    public function syncCover($id = null, $coverItem = null, $time = null) {
        if($id) {
            $cover = CoverModel::where('cover_id', $id)->orderBy('cover_id', 'asc')->get();
        }elseif($coverItem){
            if(is_array($coverItem)){
                $cover = $coverItem;
            }else{
                $cover[] = $coverItem;
            }
        }elseif($time){
            $cover = CoverModel::where('album_music_total', '>', 0)
                ->where('album_last_updated', '>',  $time)->orderBy('cover_id', 'asc')->get();
        }else {
            $cover = CoverModel::where('album_music_total', '>', 0)
                ->where('cover_id', '>', intval($_GET['c_start']))
                ->orderBy('cover_id', 'asc')->offset(0)->limit(5000)->get();
        }
        DB::disconnect('mysql');
        $datas = [];
        foreach ($cover as $key => $item) {
            $music_artist = $item->album_artist_1;
            $music_artist_id = $item->album_artist_id_1;
            if($item->album_artist_2) {
                $music_artist = $music_artist.'; '.$item->album_artist_2;
                $music_artist_id = $music_artist_id.';'.$item->album_artist_id_2;
            }
            $album_cat = $item->album_cat_id_1;
            if($album_cat) {
                $album_cat .= '_' . $item->album_cat_level_1;
                if($item->album_cat_id_2)
                    $album_cat .= ';' . $item->album_cat_id_2.'_'.$item->album_cat_level_1;
            }
            $titleSearch = Helpers::replaceKeySearch($item->music_album);
            $titleCharset = Helpers::khongdau($titleSearch, ' ');
            $artistSearch = Helpers::replaceKeySearch($music_artist);
            $artistCharset = Helpers::khongdau($artistSearch, ' ');

            $data = [
                'id' => 'cover_'.$item->cover_id,
                'music_album' => $item->music_album,
                'music_album_search' => $titleSearch,
                'music_album_artist_search' => $titleSearch .' '. $artistSearch,
                'music_album_charset' => $titleCharset,
                'music_album_artist_charset' => $titleCharset.' '. $artistCharset,
                'music_album_charset_nospace' => Helpers::replaceKeySearch(str_replace(' ', '', $titleCharset)),
                'music_album_artist_charset_nospace' => str_replace(' ', '', $titleCharset) .''.str_replace(' ', '', $artistCharset),
                'album_cover' => Helpers::cover_url($item->cover_id),
                'cover_filename' => $item->cover_filename,
                'album_cat' => !empty($album_cat) ? $album_cat : '',
                'album_link' => Helpers::album_url($item->toArray()),
                'album_bitrate' => $item->music_bitrate,
                'music_artist_html' => '',
                'album_bitrate_html' => $item->music_bitrate ? Helpers::bitrate2str($item->music_bitrate) : '',
                'album_user_id' => $item->user_id,
                'album_music_total' => $item->album_music_total,

                'album_music_artist' => '',
                'album_music_artist_id' => '',
                'album_music_artist_search' => '',
                'album_music_artist_charset' => '',
                'album_music_artist_nospace' => '',
                'album_music_artist_html' => '',
                'album_music_year' => $item->music_year,
            ];
            if($music_artist) {
//                $artistSearch = Helpers::replaceKeySearch($music_artist);
//                $artistCharset = Helpers::rawTiengVietUrl($music_artist, ' ');

                $data['album_music_artist'] = $music_artist;
                $data['album_music_artist_id'] = $music_artist_id;
                $data['album_music_artist_search'] = $artistSearch;
                $data['album_music_artist_charset'] = $artistCharset;
                $data['album_music_artist_nospace'] = str_replace(' ', '', $artistCharset);
                $data['album_music_artist_html'] = Helpers::rawHtmlArtists($music_artist_id, $music_artist);

            }
            $datas[] = $data;
//            $this->Solr->addDocuments($data);
            if(Auth::check() && Auth::user()->id == 3) {
                echo ($key) . '/ ' . $item->cover_id . "\n <br>";
            }
        }
        $this->Solr->addMultiDocuments($datas);

        if(Auth::check() && Auth::user()->id == 3) {
            if (sizeof($cover) > 0) {
                die('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><script type="text/javascript">window.location = "?c_start=' . $item->cover_id . '"; </script></head><body></body></html>');
            } else {
                die('Done! Full Data!');
            }
        }
        $this->Solr->addMultiDocuments($datas);

        return response(['Ok']);
    }

}