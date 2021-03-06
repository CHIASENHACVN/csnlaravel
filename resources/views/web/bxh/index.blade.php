<?php
use App\Library\Helpers;

global $hot_music_rows;
global $hot_video_rows;
$titleMeta = $titleBxh . ' - '. Config::get('constants.app.title');
$metaKeyWorld = 'bang xep hang, music, mp3, m4a, flac, lossless, video, mv, hd, mp4, csn, nghe nhạc, tải nhạc, lời bài hát, lyrics';
$metaDesc = 'Nghe nhạc online chất lượng cao kèm lyrics, chia sẻ và tải nhạc dạng mp3, mp4, m4a, lossless.';
if ($titleBxh == 'Bảng xếp hạng hot trong ngày') {
    $titleMeta = 'Bảng xếp hạng nhạc hot - Nơi cảm nhận top những bài hát hay nhất';
    $metaDesc = 'Nhạc hot  -Nghe nhạc hot online chất lượng cao kèm lyrics, chia sẻ và tải nhạc dạng mp3, mp4, m4a, lossles';
    $metaKeyWorld = $metaKeyWorld . ', Nhạc hot, bài hát hot, bài hát hot, nghe nhạc online, tải nhạc miễn phí, chia sẻ nhạc, bài hát, nhạc vàng, nhạc trẻ, nhạc chữ tình, nhạc xuân, remix, nghe nhạc online, edm, bolero, upload nhạc, trance, house, lời bài hát, lossless';
} elseif ($titleBxh == 'Bảng xếp hạng hot trong tuần') {
    $metaDesc = 'Bảng xếp hạng hot hàng tuần - Cập nhật nhữn bài hát hay nhất kèm chất lượng cao kèm lyrics, chia sẻ và tải nhạc dạng mp3, mp4, m4a, lossless.';
    $metaKeyWorld = $metaKeyWorld . ', Bảng xếp hạng tuần,bang xep hang bai hat, bxh bai hat, bang xep hang Viet Nam, bai hat Viet Nam, bang xep hang, bài hát hot, nghe nhạc online, tải nhạc miễn phí, chia sẻ nhạc, bài hát, nhạc vàng, nhạc trẻ, nhạc chữ tình, nhạc xuân, remix, nghe nhạc online, edm, bolero, upload nhạc, trance, house, lời bài hát, lossless';
    $titleMeta = $titleBxh . 'Bảng xếp hạng bài hát hàng tuần- Nơi cảm nhận và chia sẻ âm nhạc';
} elseif (strpos($titleBxh, 'Bảng xếp hạng hot trong tháng ') !== false) {
    $titleMeta = $titleBxh . ' - Nơi chia sẻ nhạc chất lượng cao và xếp hạng âm nhạc trực tuyến';
    $metaDesc = $titleBxh . ', Nghe nhạc online và tải nhạc miễn phí chất lượng cao kèm lyrics, chia sẻ và tải nhạc dạng mp3, mp4, m4a, lossless.';
    $metaKeyWorld = $metaKeyWorld . ', ' . $titleBxh . ', bang xep hang bai hat, bxh bai hat, bang xep hang Viet Nam, bai hat Viet Nam, bang xep hang,bài hát hot, nghe nhạc online, tải nhạc miễn phí, chia sẻ nhạc, bài hát, nhạc vàng, nhạc trẻ, nhạc chữ tình, nhạc xuân, remix, karaoke, nghe nhạc online, edm, bolero, upload nhạc, trance, house, lời bài hát, lossless';
} elseif (strpos($titleBxh, 'Bảng xếp hạng trong năm ') !== false) {
    $yearBxh = last(explode(' ', $titleBxh));
    if($yearBxh == 2019) {
        $titleMeta = $titleBxh . ' - Tuyển tập những bài chất lượng cao';
        $metaDesc = $titleBxh . ' được cập nhật hàng tuần tại chiasenhac.vn dựa theo lượt nghe, yêu thích trên nhiều nền tảng khác nhau';
        $metaKeyWorld = $metaKeyWorld . ', Bảng xếp hạng bài hát, bxh bài hát, bảng xếp hạng Việt Nam, bài hát Việt Nam, bảng xếp hạng, bảng xếp hạng bài hát 2019';
    }else{
        $metaDesc = $titleBxh . ' - Tuyển tập 20 bài hát hot nhất được yêu thích nhất và tải nhiều nhất tại chiasenhac .vn';
        $metaKeyWorld = $metaKeyWorld . ', Bảng xếp hạng bài hát ' . $yearBxh . ', bxh bài hát ' . $yearBxh . ', bảng xếp hạng Việt Nam ' . $yearBxh . ', bài hát Việt Nam, bảng xếp hạng ' . $yearBxh . ', bảng xếp hạng bài hát';
    }
  }
?>
@section('meta')
    <meta name="copyright" content="{{env('APP_URL')}}" />
    <meta name="revisit-after" content="7 Days">
    <meta name="keywords" content="{{$metaKeyWorld}}">
    <meta name="description" content="{{$metaDesc}}">
    <link rel="canonical" href="{{url()->current()}}" />
    <link rel="image_src" href="{{env('IMG_DATA_URL')}}imgs/cover_bxh.png" />
    <meta name="title" content="{{$titleMeta}}" />
    <meta property="og:image" content="{{env('IMG_DATA_URL')}}imgs/cover_bxh.png" />
    <meta property="og:url" content="{{url()->current()}}" />
    <meta property="og:title" content="{{$titleMeta}}" />
    <meta property="og:description" content="{{$metaDesc}}" />
    <meta property="og:type" content="website" />
    <meta property="og:updated_time" content="{{time()}}" />
@endsection
@extends('web.layouts.app')
@section('contentCSS')
@endsection
@section('content')
<?php
if (file_exists(app_path() . '/../resources/views/cache/bxh/'.$cacheBxh.'.blade.php')) {
?> @include('cache.bxh.'.$cacheBxh); <?php
}
?>
<div class="container">
    <div class="row row_wrapper">
        <div class="col-md-9">
            <ul class="nav nav-tabs nav-justified nav_bxh" id="myTab" role="tablist">
                <?php
                array_map(function ($item) {
                    ?>
                    <li class="nav-item">
                        <a class="nav-link {{$item['cat_url']}} {{$item['cat_id'] == DEFAULT_CAT_ID_ACTIVE_BXH ? 'active show' : ''}}" id="profile-tab" data-toggle="tab" href="#cat-{{$item['cat_id']}}" role="tab" aria-controls="cat-{{$item['cat_id']}}" aria-selected="false">{{$item['cat_short_title']}}</a>
                    </li>
                    <?php
                }, $category);
                ?>
            </ul>
            <div class="tab-content" id="myTabContent">
                <?php
                array_map(function ($itemCategory) use($hot_music_rows, $hot_video_rows, $urlBxh, $catVideo) {
                    $musicList = $hot_music_rows[$itemCategory['cat_id']] ?? [];
                    $videoList = (isset($hot_video_rows[$itemCategory['cat_id'] - 2])? $hot_video_rows[$itemCategory['cat_id'] - 2] : []);
                    ?>
                    <div class="tab-pane fade{{$itemCategory['cat_id'] == DEFAULT_CAT_ID_ACTIVE_BXH ? ' active show' : ''}}" id="cat-{{$itemCategory['cat_id']}}" role="tabpanel" aria-labelledby="home-tab">
                    <div class="media media-tab">
                        <div class="media-left">
                            <h2 class="media-title">Bảng xếp hạng <br> {{$itemCategory['cat_short_title']}}</h2>
                        </div>
                        <div class="media-body">
                            <p>Bảng Xếp Hạng CSN cập nhật hàng ngày dựa trên số liệu thống kê thực tế trên hệ thống website CSN, dựa vào các chỉ số như: lượt nghe, lượt tải, bình luận, chia sẻ...</p>
                        </div>
                    </div>
                    <nav class="nav_sub_bxh d-flex justify-content-between align-items-center">
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            @if($musicList)
                            <a class="nav-item nav_bxh nav-link active {{$itemCategory['cat_url']}}-music" id="nav-home-tab" data-toggle="tab" href="#cat-{{$itemCategory['cat_id']}}-music" role="tab" aria-controls="nav-home" aria-selected="true">bài hát</a>
                            @endif
                            @if($videoList)
                            <a class="nav-item nav_bxh nav-link {{$itemCategory['cat_url']}}-video" id="nav-profile-tab" data-toggle="tab" href="#cat-{{$itemCategory['cat_id']}}-video" role="tab" aria-controls="nav-profile" aria-selected="false">video</a>
                            @endif
                        </div>
                        <div>

                        </div>
                        <a class="d-flex align-items-center view_all" href="{{$urlBxh}}/{{$itemCategory['cat_url']}}.html" title="">Nghe tất cả <i class="material-icons">play_circle_outline</i></a>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active tab_bxh tab_music_bxh" data-cat_url="{{$itemCategory['cat_url']}}" id="cat-{{$itemCategory['cat_id']}}-music" role="tabpanel" aria-labelledby="nav-home-tab">
                            <ul class="list-unstyled list_music bxh1">
                                <?php
                                    if($musicList) {
                                        array_map(function ($i, $item) use($itemCategory, $urlBxh) {
                                        $i = ++$i;
                                        $musicId = Helpers::music_id($item);
                                        $url = $urlBxh.'/'.$itemCategory['cat_url'].'.html?playlist='.$i;
                                        ?>
                                        <li class="media align-items-stretch {{$i == 1 ? 'up' : ($i == 2 ? 'down' : 'not')}}">
                                            <div class="media_tmp align-self-center d-flex align-items-center mr-3 pl-3" style="width: 50px">
                                                <span class="counter">{{sprintf("%02d", $i)}}</span>
                                                {{--<i class="material-icons">{{$i == 1 ? 'keyboard_arrow_up' : ($i == 2 ? 'keyboard_arrow_down' : 'remove')}}</i>--}}
                                                {{--<span class="rate">+1</span>--}}
                                            </div>
                                            <div class="media-left align-items-stretch mr-2">
                                                <a href="{{$url}}" title="{{$item['music_title']}}">
                                                    <img src="{{$item['cover_thumb_html']}}" alt="{{$item['music_title']}}">
                                                    <i class="material-icons">play_circle_outline</i>
                                                </a>
                                            </div>
                                            <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                                <div>
                                                    <h5 class="media-title mt-0 mb-0"><a href="{{$url}}" title="{{$item['music_title']}}">{{$item['music_title']}}</a></h5>
                                                    <div class="author"><?php echo $item['music_artist_html'] ?></div>
                                                </div>
                                                <small class="type_music c1"><?php echo $item['music_bitrate_html']; ?></small>
                                            </div>
                                            <div class="media-right align-self-center">
                                                <small class="time_stt"><i class="material-icons listen-material-icons"> play_arrow </i>{{number_format($item['music_listen'])}}</small>
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><a href="{{Helpers::listen_url($item)}}" title="nghe riêng nhạc {{$item['music_title']}}"><i class="material-icons">headset</i></a></li>
                                                    <li class="list-inline-item"><a href="{{Helpers::fbShareLink($url, true)}}" class="fb-share-link" target="_blank" title="chia sẻ {{$item['music_title']}}"><i class="material-icons">share</i></a></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <?php
                                        }, array_keys($musicList), $musicList);
                                    }else{
                                        ?>
                                            Không tìm thấy bài hát
                                        <?php
                                    }
                                ?>
                            </ul>
                        </div>
                        @if($videoList)
                        <?php
                            $videoItem = $catVideo[array_search($itemCategory['cat_id'] - 2, array_column($catVideo, 'cat_level'))];
                        ?>
                        <div class="tab-pane fade tab_bxh tab_video_bxh" data-cat_url="{{CAT_VIDEO_URL.'/'.$videoItem['cat_url']}}" id="cat-{{$itemCategory['cat_id']}}-video" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <ul class="list-unstyled list_music bxh1">
                                <?php
                                array_map(function ($i, $item) use ($catVideo, $videoItem, $urlBxh) {
                                $i = ++$i;
                                $musicId = Helpers::music_id($item);
                                $url = $urlBxh.'/'.CAT_VIDEO_URL.'/'.$videoItem['cat_url'].'.html?playlist='.$i;
                                ?>
                                <li class="media align-items-stretch {{$i == 1 ? 'up' : ($i == 2 ? 'down' : 'not')}}">
                                    <div class="media_tmp align-self-center d-flex align-items-center mr-3 pl-3" style="width: 50px">
                                        <span class="counter">{{sprintf("%02d", $i)}}</span>
                                        {{--<i class="material-icons">{{$i == 1 ? 'keyboard_arrow_up' : ($i == 2 ? 'keyboard_arrow_down' : 'remove')}}</i>--}}
                                        {{--<span class="rate">+1</span>--}}
                                    </div>
                                    <div class="col-2">
                                        <div class="card card1 video">
                                            <div class="card-header" style="background-image: url({{Helpers::thumbnail_url($item)}});">
                                                <a href="{{$url}}" title="{{$item['music_title']}}">
                                                    <span class="icon-play"></span>
                                                </a>
                                            </div>
                                            <span class="time"><img src="/mobile/assets/images/icon/ic_menu_clock.png" width="14">{{$item['music_length'] >= 3600 ? gmdate("H:i:s", $item['music_length']) : gmdate("i:s", $item['music_length'])}}</span>
                                        </div>
                                    </div>
                                    <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                        <div>
                                            <h5 class="media-title mt-0 mb-0"><a href="{{$url}}" title="{{$item['music_title']}}">{{$item['music_title']}}</a></h5>
                                            <div class="author"><?php echo $item['music_artist_html'] ?? '' ?></div>
                                            <?php echo Helpers::size2str($item['music_width'], $item['music_height']) ?>
                                        </div>
                                    </div>
                                    <div class="media-right align-self-center">
                                        <small class="time_stt"><i class="material-icons listen-material-icons"> play_arrow </i>{{number_format($item['music_listen'])}}</small>
                                        <ul class="list-inline">
                                            <li class="list-inline-item"><a href="{{Helpers::listen_url($item)}}" title="nghe riêng nhạc {{$item['music_title']}}"><i class="material-icons">headset</i></a></li>
                                            <li class="list-inline-item"><a href="{{Helpers::fbShareLink($url, true)}}" class="fb-share-link" title="chia sẻ {{$item['music_title']}}"><i class="material-icons">share</i></a></li>
                                        </ul>
                                    </div>
                                </li>
                                <?php
                                }, array_keys($videoList), $videoList);
                                ?>
                            </ul>
                        </div>
                        @endif
                    </div>
                </div>
                    <?php
                }, $category);
                ?>
            </div>
        </div>
        <div class="col-md-3">
            @include('web.layouts.right_banner')
        </div>
    </div>
</div>
@endsection
@section('contentJS')
<script>
    $('.nav_sub_bxh').each(function (e) {
        var urlCat = '';
        $(this).find('.nav_bxh').on('click', function () {
            urlCat = $($(this).attr('href')).data('cat_url');
            $(this).parent().parent().find('.view_all').attr('href', '<?php echo $urlBxh ?>/' + urlCat + '.html');
        })
    });
    <?php
    if(isset($_GET['tab'])) {
    ?>
    $( document ).ready(function() {
        setTimeout(function(){
            $('.<?php echo $_GET['tab'] ?>').click();
        }, 100);
        <?php
        if(isset($_GET['type'])) {
            ?>
            setTimeout(function(){
                $('.<?php echo $_GET['tab'] ?>-<?php echo $_GET['type'] ?>').click();
            }, 150);
            <?php
        }
        ?>
    });
    <?php
    }
    ?>
</script>
@endsection
