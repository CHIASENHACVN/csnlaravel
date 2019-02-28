<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/17/2018
 * Time: 3:38 PM
 */
namespace App\Http\Controllers\Sync;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request as Request;
use Illuminate\Support\Facades\Auth;
use App\Library\Helpers;
use App\Models\CategoryCsnModel;
use App\Repositories\Music\MusicEloquentRepository;
use App\Repositories\Category\CategoryEloquentRepository;
use App\Repositories\MusicListen\MusicListenEloquentRepository;
use App\Repositories\MusicException\MusicExceptionEloquentRepository;
use App\Repositories\VideoException\VideoExceptionEloquentRepository;
use App\Repositories\ArtistException\ArtistExceptionRepository;
use DB;

class BxhCategoryController extends Controller
{
    protected $musicRepository;
    protected $categoryRepository;
    protected $musicListenRepository;
    protected $artistExpRepository;

    public function __construct(MusicEloquentRepository $musicRepository, CategoryEloquentRepository $categoryRepository, MusicListenEloquentRepository $musicListenRepository, ArtistExceptionRepository $artistExpRepository) {
        $this->musicRepository = $musicRepository;
        $this->categoryRepository = $categoryRepository;
        $this->musicListenRepository = $musicListenRepository;
        $this->artistExpRepository = $artistExpRepository;
    }
    public function syncBxhCategory($today = true, $week = false) {
        $catregory =$this->categoryRepository->getCategoryParent();
        DB::disconnect('mysql');
        if($today) {
        $ressultMusic = [];
        $ressultVideo = [];
        $artistExp = $this->artistExpRepository->getArrIds();
        foreach ($catregory as $item) {
            $result = $this->musicListenRepository->bxhHotTodayCategoryMusic($item->cat_id)->toArray();
            foreach($result as $item2) {
                if(!Helpers::checkExitsExcepArtist($item2['music_artist_id'], $artistExp)) {
                    $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                    $item2['music_bitrate_html'] = Helpers::bitrate2str($item2['music_bitrate']);
                    $ressultMusic[$item->cat_id][] = $item2;
                }
            }
            $result = $this->musicListenRepository->bxhHotTodayCategoryVideo($item->cat_id)->toArray();
            foreach($result as $item2) {
                if(!Helpers::checkExitsExcepArtist($item2['music_artist_id'], $artistExp)) {
                    $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                    $item2['music_bitrate_html'] = Helpers::size2str($item2['music_width'], $item2['music_height']);
                    $ressultVideo[$item->cat_id][] = $item2;
                }
            }
        }
        file_put_contents(resource_path().'/views/cache/bxh/bxh_today.blade.php',
            '<?php 
if ( !ENV(\'IN_PHPBB\') )
{
    die(\'Hacking attempt\');
    exit;
}
global $hot_music_rows;
global $hot_video_rows;
    
$hot_music_rows = ' . var_export($ressultMusic, true) . ';
$hot_video_rows = ' . var_export($ressultVideo, true) . ';
?>');
        }
        if($week) {
            $ressultMusic = [];
            $ressultVideo = [];
            foreach ($catregory as $item) {
                $result = $this->musicListenRepository->bxhWeekCategoryMusic($item->cat_id)->toArray();
                DB::disconnect('mysql');
                foreach ($result as $item2) {
                    $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                    $item2['music_bitrate_html'] = Helpers::bitrate2str($item2['music_bitrate']);
                    $ressultMusic[$item->cat_id][] = $item2;
                }
                $result = $this->musicListenRepository->bxhWeekCategoryVideo($item->cat_id)->toArray();
                DB::disconnect('mysql');
                foreach ($result as $item2) {
                    $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                    $item2['music_bitrate_html'] = Helpers::size2str($item2['music_width'], $item2['music_height']);
                    $ressultVideo[$item->cat_id][] = $item2;
                }
            }
            file_put_contents(resource_path() . '/views/cache/bxh/bxh_week.blade.php',
                '<?php 
if ( !ENV(\'IN_PHPBB\') )
{
    die(\'Hacking attempt\');
    exit;
}
global $hot_music_rows;
global $hot_video_rows;
    
$hot_music_rows = ' . var_export($ressultMusic, true) . ';
$hot_video_rows = ' . var_export($ressultVideo, true) . ';
?>');
        }
        return response(['Ok']);
    }
    public function syncBxhCategoryMonthYear($month = 'all', $year = CURRENT_YEAR) {
        $ressultMusic = [];
        $ressultVideo = [];
        $catregory =$this->categoryRepository->getCategoryParent();
        if($month == 'all') {
            foreach ($catregory as $item) {
                $result = $this->musicListenRepository->bxhYearCategoryMusic($item->cat_id, $year)->toArray();
                DB::disconnect('mysql');
                foreach($result as $item2) {
                    $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                    $item2['music_bitrate_html'] = Helpers::bitrate2str($item2['music_bitrate']);
                    $ressultMusic[$item->cat_id][] = $item2;
                }
                $result = $ressultVideo[$item->cat_id] = $this->musicListenRepository->bxhYearCategoryVideo($item->cat_id, $year)->toArray();
                DB::disconnect('mysql');
                foreach($result as $item2) {
                    $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                    $item2['music_bitrate_html'] = Helpers::size2str($item2['music_width'], $item2['music_height']);
                    $ressultVideo[$item->cat_id][] = $item2;
                }
            }
            file_put_contents(resource_path().'/views/cache/bxh/bxh_'.$month.'_'.$year.'.blade.php',
                '<?php 
if ( !ENV(\'IN_PHPBB\') )
{
    die(\'Hacking attempt\');
    exit;
}
global $hot_music_rows;
global $hot_video_rows;
    
$hot_music_rows = ' . var_export($ressultMusic, true) . ';
$hot_video_rows = ' . var_export($ressultVideo, true) . ';
?>');
        }else{
            for($i = ($month == 'all_month' ? 1 : $month); $i <= ($month == 'all_month' ? 12 : $month); $i++) {
                $month = sprintf('%02d', $i);
                $firstDate = strtotime('01-'.$month.'-'.$year);
                $lastDate = strtotime(date('t-m-Y', $firstDate));
                $ressultMusic = [];
                $ressultVideo = [];
                foreach ($catregory as $item) {
                    $result = $this->musicListenRepository->bxhMonthCategoryMusic($item->cat_id, $firstDate, $lastDate, $year)->toArray();
                    DB::disconnect('mysql');
                    foreach($result as $item2) {
                        $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                        $item2['music_bitrate_html'] = Helpers::bitrate2str($item2['music_bitrate']);
                        $ressultMusic[$item->cat_id][] = $item2;
                    }
                    $result = $this->musicListenRepository->bxhMonthCategoryVideo($item->cat_id, $firstDate, $lastDate, $year)->toArray();
                    DB::disconnect('mysql');
                    foreach($result as $item2) {
                        $item2['music_artist_html'] = Helpers::rawHtmlArtists($item2['music_artist_id'], $item2['music_artist']);
                        $item2['music_bitrate_html'] = Helpers::size2str($item2['music_width'], $item2['music_height']);
                        $ressultVideo[$item->cat_id][] = $item2;
                    }
                }
                file_put_contents(resource_path().'/views/cache/bxh/bxh_'.$month.'_'.$year.'.blade.php',
                    '<?php 
if ( !ENV(\'IN_PHPBB\') )
{
    die(\'Hacking attempt\');
    exit;
}
global $hot_music_rows;
global $hot_video_rows;
    
$hot_music_rows = ' . var_export($ressultMusic, true) . ';
$hot_video_rows = ' . var_export($ressultVideo, true) . ';
?>');
            }
        }
        return response(['Ok']);
    }
}