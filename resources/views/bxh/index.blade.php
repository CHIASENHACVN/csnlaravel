<?php
use App\Library\Helpers;
$titleMeta = $titleBxh . ' - '. Config::get('constants.app.title');

global $hot_music_rows;
global $hot_video_rows;
?>
@extends('layouts.app')
@section('contentCSS')
@endsection
@section('content')
@include('cache.bxh.'.$cacheBxh)
<div class="container">
    <div class="row row_wrapper">
        <div class="col-md-9">
            <ul class="nav nav-tabs nav-justified nav_bxh" id="myTab" role="tablist">
                <?php
                array_map(function ($item) {
                    ?>
                    <li class="nav-item">
                        <a class="nav-link {{$item['cat_id'] == DEFAULT_CAT_ID_ACTIVE_BXH ? 'active show' : ''}}" id="profile-tab" data-toggle="tab" href="#cat-{{$item['cat_id']}}" role="tab" aria-controls="cat-{{$item['cat_id']}}" aria-selected="false">{{$item['cat_short_title']}}</a>
                    </li>
                    <?php
                }, $category);
                ?>
            </ul>
            <div class="tab-content" id="myTabContent">
                <?php
                array_map(function ($itemCategory) use($hot_music_rows, $hot_video_rows, $urlBxh, $catVideo) {
                    $musicList = $hot_music_rows[$itemCategory['cat_id']];
                    $videoList = (isset($hot_video_rows[$itemCategory['cat_id'] - 2])? $hot_video_rows[$itemCategory['cat_id'] - 2] : []);
                    ?>
                    <div class="tab-pane fade{{$itemCategory['cat_id'] == DEFAULT_CAT_ID_ACTIVE_BXH ? ' active show' : ''}}" id="cat-{{$itemCategory['cat_id']}}" role="tabpanel" aria-labelledby="home-tab">
                    <div class="media media-tab">
                        <div class="media-left">
                            <h2 class="media-title">Bảng xếp hạng <br> {{$itemCategory['cat_short_title']}}</h2>
                        </div>
                        <div class="media-body">
                            <p>Bảng Xếp Hạng CSN cập nhật vào thứ Hai hàng tuần dựa trên số liệu thống kê thực tế trên desktop và mobile CSN. Trong đó những trọng số quan trọng quyết định thứ hạng TOP 20 như sau: Nghe, Thích, Bình Luận, Chia sẻ, Tải v.v... Mỗi tương tác của người dùng đều tác động đến kết quả cuối cùng của BXH CSN.</p>
                        </div>
                    </div>
                    <nav class="nav_sub_bxh d-flex justify-content-between align-items-center">
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            @if($musicList)
                            <a class="nav-item nav_bxh nav-link active" id="nav-home-tab" data-toggle="tab" href="#cat-{{$itemCategory['cat_id']}}-music" role="tab" aria-controls="nav-home" aria-selected="true">bài hát</a>
                            @endif
                            @if($videoList)
                            <a class="nav-item nav_bxh nav-link" id="nav-profile-tab" data-toggle="tab" href="#cat-{{$itemCategory['cat_id']}}-video" role="tab" aria-controls="nav-profile" aria-selected="false">video</a>
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
                                array_map(function ($i, $item) use($itemCategory, $urlBxh) {
                                $i = ++$i;
                                $musicId = Helpers::music_id($item);
                                $url = $urlBxh.'/'.$itemCategory['cat_url'].'.html?playlist='.$i;
                                ?>
                                <li class="media align-items-stretch {{$i == 1 ? 'up' : ($i == 2 ? 'down' : 'not')}}">
                                    <div class="media_tmp align-self-center d-flex align-items-center mr-3 pl-3">
                                        <span class="counter">{{sprintf("%02d", $i)}}</span>
                                        <i class="material-icons">{{$i == 1 ? 'keyboard_arrow_up' : ($i == 2 ? 'keyboard_arrow_down' : 'remove')}}</i>
                                        <span class="rate">+1</span>
                                    </div>
                                    <div class="media-left align-items-stretch mr-2">
                                        <a href="{{$url}}" title="{{$item['music_title']}}">
                                            <img src="{{Helpers::cover_url($item['cover_id'])}}" alt="{{$item['music_title']}}">
                                            <i class="material-icons">play_circle_outline</i>
                                        </a>
                                    </div>
                                    <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                        <div>
                                            <h5 class="media-title mt-0 mb-0"><a href="{{$url}}" title="{{$item['music_title']}}">{{$item['music_title']}}</a></h5>
                                            <div class="author"><?php echo '<a href="#">'.implode(',</a><a href="#">', explode(';', $item['music_artist'])).'</a>' ?></div>
                                        </div>
                                        <small class="type_music c1"><?php echo Helpers::bitrate2str($item['music_bitrate']); ?></small>
                                    </div>
                                    <div class="media-right align-self-center">
                                        <small class="time_stt"><i class="material-icons listen-material-icons"> play_arrow </i>{{number_format($item['music_listen'])}}</small>
                                        <ul class="list-inline">
                                            <li class="list-inline-item"><a href="{{MUSIC_PATH.$item['music_filename']}}" title="download {{$item['music_title']}}"><i class="material-icons">file_download</i></a></li>
                                            <li class="list-inline-item"><a href="{{Helpers::listen_url($item)}}" title="nghe riêng nhạc {{$item['music_title']}}"><i class="material-icons">headset</i></a></li>
                                            <li class="list-inline-item"><a href="{{Helpers::fbShareLink($url, true)}}" target="_blank" title="chia sẻ {{$item['music_title']}}"><i class="material-icons">share</i></a></li>
                                        </ul>
                                    </div>
                                </li>
                                <?php
                                }, array_keys($musicList), $musicList);
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
                                    <div class="media_tmp align-self-center d-flex align-items-center mr-3 pl-3">
                                        <span class="counter">{{sprintf("%02d", $i)}}</span>
                                        <i class="material-icons">{{$i == 1 ? 'keyboard_arrow_up' : ($i == 2 ? 'keyboard_arrow_down' : 'remove')}}</i>
                                        <span class="rate">+1</span>
                                    </div>
                                    <div class="col-2">
                                        <div class="card card1 video">
                                            <div class="card-header" style="background-image: url({{Helpers::thumbnail_url($item)}});">
                                                <a href="{{$url}}" title="{{$item['music_title']}}">
                                                    <span class="icon-play"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                        <div>
                                            <h5 class="media-title mt-0 mb-0"><a href="{{$url}}" title="{{$item['music_title']}}">{{$item['music_title']}}</a></h5>
                                            <div class="author"><?php echo '<a href="#">'.implode(',</a><a href="#">', explode(';', $item['music_artist'])).'</a>' ?></div>
                                        </div>
                                    </div>
                                    <div class="media-right align-self-center">
                                        <small class="time_stt"><i class="material-icons listen-material-icons"> play_arrow </i>{{number_format($item['music_listen'])}}</small>
                                        <ul class="list-inline">
                                            <li class="list-inline-item"><a href="{{MUSIC_PATH.$item['music_filename']}}" title="download {{$item['music_title']}}"><i class="material-icons">file_download</i></a></li>
                                            <li class="list-inline-item"><a href="{{Helpers::listen_url($item)}}" title="nghe riêng nhạc {{$item['music_title']}}"><i class="material-icons">headset</i></a></li>
                                            <li class="list-inline-item"><a href="{{Helpers::fbShareLink($url, true)}}" title="chia sẻ {{$item['music_title']}}"><i class="material-icons">share</i></a></li>
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
            <a class="catalog1 weekend" style="background-image: url(https://i.scdn.co/image/6a6098cd1369420b9b6ff941ff41ded1b1dceb06);" href="#" title="">
                <span>weekend</span>
            </a>
            <a class="catalog1 edm" style="background-image: url(https://i.scdn.co/image/c8ffd7bd0df17c05fd8a1efef33ad793eea0e47d);" href="#" title="">
                <span>EDM</span>
            </a>
            <a class="catalog1 love" style="background-image: url(https://i.scdn.co/image/56228f9353b23405516a6ea8af1c22083f450b57);" href="#" title="">
                <span>love</span>
            </a>
            <br>
            <div class="card mb-3 cardads">
                <a class="card-img-top" href="#" title=""><img class="" src="http://adi.admicro.vn/adt/adn/2018/03/7a-ad-adx5aa737ceba8f7.jpg" alt=""></a>
            </div>
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
            console.log(urlCat);
            $(this).parent().parent().find('.view_all').attr('href', '<?php echo $urlBxh ?>/' + urlCat + '.html');
        })
    });
</script>
@endsection
