<?php
use App\Library\Helpers;
$titleMeta = $titleSearch . ' '. Config::get('constants.app.title');
?>
@section('meta')
    <meta name="copyright" content="{{env('APP_DOMAIN')}}" />
    <meta name="revisit-after" content="7 Days">
    <meta name="keywords" content="bang xep hang, music, mp3, m4a, flac, lossless, video, mv, hd, mp4, csn, nghe nhạc, tải nhạc, lời bài hát, lyrics">
    <meta name="description" content="Nghe nhạc online chất lượng cao kèm lyrics, chia sẻ và tải nhạc dạng mp3, mp4, m4a, lossless.">
    <link rel="canonical" href="{{url()->current()}}" />
    <link rel="image_src" href="{{env('APP_URL')}}/imgs/no_cover.png" />
    <meta name="title" content="{{$titleMeta}}" />
    <meta property="og:image" content="{{env('APP_URL')}}/imgs/no_cover.png" />
    <meta property="og:url" content="{{url()->current()}}" />
    <meta property="og:title" content="{{$titleMeta}}" />
    <meta property="og:description" content="Nghe nhạc online chất lượng cao kèm lyrics, chia sẻ và tải nhạc dạng mp3, mp4, m4a, lossless." />
    <meta property="og:type" content="website" />
    <meta property="og:updated_time" content="{{time()}}" />
@endsection
@extends('web.layouts.app')
@section('contentCSS')
@endsection
@section('content')
<div class="container">
    <div class="row row_wrapper">
        <div class="col-md-9">
            <nav class="nav_kq_search d-flex align-items-center justify-content-between">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link {{(isset($_GET['page_music']) || isset($_GET['page_album']) || isset($_GET['page_video']) || isset($_GET['page_artist']) ) ? '' : 'active'}}" id="nav-all-tab" data-toggle="tab" href="#nav-all" role="tab" aria-controls="nav-all" aria-selected="true">tất cả</a>
                    <a class="nav-item nav-link {{isset($_GET['page_music']) ? 'active' : ''}}" id="nav-music-tab" data-toggle="tab" href="#nav-music" role="tab" aria-controls="nav-music" aria-selected="false">bài hát ({{number_format($result['music']['row_total'])}})</a>
                    <a class="nav-item nav-link {{isset($_GET['page_album']) ? 'active' : ''}}" id="nav-album-tab" data-toggle="tab" href="#nav-album" role="tab" aria-controls="nav-album" aria-selected="false">album ({{number_format($result['album']['row_total'])}})</a>
                    <a class="nav-item nav-link {{isset($_GET['page_video']) ? 'active' : ''}}" id="nav-video-tab" data-toggle="tab" href="#nav-video" role="tab" aria-controls="nav-video" aria-selected="false">video ({{number_format($result['video']['row_total'])}})</a>
                    <a class="nav-item nav-link {{isset($_GET['page_artist']) ? 'active' : ''}}" id="nav-artist-tab" data-toggle="tab" href="#nav-artist" role="tab" aria-controls="nav-artist" aria-selected="false">ca sĩ ({{number_format($result['artist']['row_total'])}})</a>
                </div>
                <div class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Lọc kết quả
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                        <div class="row">
                            <div class="col-md-4">
                                <h3 class="title">Tìm theo</h3>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Tên bài hát
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Ca sỹ
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Sáng tác
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Tên Album
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Lời bài hát
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h3 class="title">Tìm theo</h3>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Tên bài hát
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Ca sỹ
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Sáng tác
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Tên Album
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Lời bài hát
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h3 class="title">Tìm theo</h3>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Tên bài hát
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Ca sỹ
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Sáng tác
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Tên Album
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Lời bài hát
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade {{(isset($_GET['page_music']) || isset($_GET['page_album']) || isset($_GET['page_video']) || isset($_GET['page_artist'])) ? '' : 'show active'}}" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                    <div class="card card-note-search">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="txt-note">Từ khoá <b>{{$search}}</b> có {{number_format($result['music']['row_total'] + $result['album']['row_total'] + $result['video']['row_total'])}} kết quả</span>
                            </div>
                        </div>
                    </div>
                    @if($result['music']['data'])
                        <div class="box_header d-flex justify-content-between align-items-end">
                            <h5 class="title m-0">Bài hát</h5>
                        </div>
                        <ul class="list-unstyled list_music music_kq">
                            <?php
                            array_map(function ($item) {
                            ?>
                            <li class="media align-items-stretch">
                                <div class="media-left align-items-stretch mr-2">
                                    <a href="{{$item['music_link']}}" title="{{$item['music_title']}}">
                                        <img src="{{$item['music_cover']}}" alt="{{$item['music_title']}}">
                                        <i class="material-icons">play_circle_outline</i>
                                    </a>
                                </div>
                                <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                    <div>
                                        <h5 class="media-title mt-0 mb-0"><a href="{{$item['music_link']}}" title="{{$item['music_title']}}" class="search_title">{{$item['music_title']}}</a></h5>
                                        <div class="author"><?php echo $item['music_artist'] ?></div>
                                    </div>
                                    <small class="type_music c1"><?php echo $item['music_bitrate'] ?></small>
                                </div>
                                <div class="media-right align-self-center">
                                    <small class="time_stt">{{number_format($item['music_listen'])}}</small>
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><a href="{{Helpers::fbShareLink($item['music_link'], true)}}" target="_blank" title="chia sẻ {{$item['music_title']}}"><i class="material-icons">share</i></a></li>
                                    </ul>
                                </div>
                            </li>
                            <?php
                            }, $result['music']['data'])
                            ?>
                        </ul>
                    @endif
                    @if($result['album']['data'])
                    <div class="box_header d-flex justify-content-between align-items-end">
                        <h5 class="title m-0">Album</h5>
                        <a class="link_more" href="#" title="">Xem tất cả</a>
                    </div>
                    <div class="row row10px float-col-width">
                        <?php
                        $countAlbum = count($result['album']['data']);
                        array_map(function ($item) use ($countAlbum) {
                        ?>
                        <div class="col {{($countAlbum != 5 && $countAlbum != 10) ? 'col col-md-3' : ''}}">
                            <div class="card card1">
                                <div class="card-header" style="background-image: url({{$item['album_cover']}});">
                                    <a href="{{$item['album_link']}}" title="{{$item['music_album']}}">
                                        <span class="icon-play"></span>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title"><a href="{{$item['album_link']}}" title="{{$item['music_album']}}" class="search_title" >{{$item['music_album']}}</a></h3>
                                    <p class="card-text"><?php echo $item['album_artist'] ?></p>
                                </div>
                            </div>
                        </div>
                        <?php
                        }, $result['album']['data'])
                        ?>
                    </div>
                    @endif
                    @if($result['video']['data'])
                    <div class="box_header d-flex justify-content-between align-items-end">
                        <h5 class="title m-0">Video</h5>
                        <a class="link_more" href="#" title="">Xem tất cả</a>
                    </div>
                    <div class="row row10px float-col-width-video">
                        <?php
                        array_map(function ($item) {
                        ?>
                        <div class="col col col-md-3">
                            <div class="card card1 video">
                                <div class="card-header" style="background-image: url({{$item['video_cover']}});">
                                    <a href="{{$item['video_link']}}" title="{{$item['video_title']}}">
                                        <span class="icon-play"></span>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title"><a href="{{$item['video_link']}}" title="{{$item['video_title']}}" class="search_title" >{{$item['video_title']}}</a></h3>
                                    <p class="card-text"><?php echo $item['video_artist'] ?></p>
                                </div>
                            </div>
                        </div>
                        <?php
                        }, $result['video']['data'])
                        ?>
                    </div>
                    @endif
                </div>
                <div class="tab-pane fade {{isset($_GET['page_music']) ? 'show active' : ''}}" id="nav-music" role="tabpanel" aria-labelledby="nav-music-tab">
                    <div class="card card-note-search">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="txt-note">Từ khoá <b>{{$search}}</b> có {{number_format($result['music']['row_total'])}} kết quả</span>
                            </div>
                        </div>
                    </div>
                    @if($result['music']['data'])
                        <ul class="list-unstyled list_music music_kq">
                            <?php
                            array_map(function ($item) {
                            ?>
                            <li class="media align-items-stretch">
                                <div class="media-left align-items-stretch mr-2">
                                    <a href="{{$item['music_link']}}" title="{{$item['music_title']}}">
                                        <img src="{{$item['music_cover']}}" alt="{{$item['music_title']}}">
                                        <i class="material-icons">play_circle_outline</i>
                                    </a>
                                </div>
                                <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                    <div>
                                        <h5 class="media-title mt-0 mb-0"><a href="{{$item['music_link']}}" title="{{$item['music_title']}}" class="search_title">{{$item['music_title']}}</a></h5>
                                        <div class="author"><?php echo $item['music_artist'] ?></div>
                                    </div>
                                    <small class="type_music c1"><?php echo $item['music_bitrate'] ?></small>
                                </div>
                                <div class="media-right align-self-center">
                                    <small class="time_stt">{{number_format($item['music_listen'])}}</small>
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><a href="{{Helpers::fbShareLink($item['music_link'], true)}}" target="_blank" title="chia sẻ {{$item['music_title']}}"><i class="material-icons">share</i></a></li>
                                    </ul>
                                </div>
                            </li>
                            <?php
                            }, $result['music']['data'])
                            ?>
                        </ul>
                        <center><?php Helpers::pagingCustom($result['music']['page'], $result['music']['rows'], $result['music']['row_total'], '<a href="?q='.$search.'&page_music=%d">%d</a>') ?></center>
                    @endif
                </div>
                <div class="tab-pane fade {{isset($_GET['page_album']) ? 'show active' : ''}}" id="nav-album" role="tabpanel" aria-labelledby="nav-album-tab">
                    <div class="card card-note-search">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="txt-note">Từ khoá <b>{{$search}}</b> có {{number_format($result['album']['row_total'])}} kết quả</span>
                            </div>
                        </div>
                    </div>
                    @if($result['album']['data'])
                    <div class="row row10px float-col-width">
                        <?php
                        $countAlbum = count($result['album']['data']);
                        array_map(function ($item) use ($countAlbum) {
                        ?>
                        <div class="col {{($countAlbum != 5 && $countAlbum != 10) ? 'col col-md-3' : ''}}">
                            <div class="card card1">
                                <div class="card-header" style="background-image: url({{$item['album_cover']}});">
                                    <a href="{{$item['album_link']}}" title="{{$item['music_album']}}">
                                        <span class="icon-play"></span>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title"><a href="{{$item['album_link']}}" title="{{$item['music_album']}}" class="search_title" >{{$item['music_album']}}</a></h3>
                                    <p class="card-text"><?php echo $item['album_artist'] ?></p>
                                </div>
                            </div>
                        </div>
                        <?php
                        }, $result['album']['data'])
                        ?>
                    </div>
                    <center><?php Helpers::pagingCustom($result['album']['page'], $result['album']['rows'], $result['album']['row_total'], '<a href="?q='.$search.'&page_album=%d">%d</a>') ?></center>
                    @endif
                </div>
                <div class="tab-pane fade {{isset($_GET['page_video']) ? ' show active' : ''}}" id="nav-video" role="tabpanel" aria-labelledby="nav-video-tab">
                    <div class="card card-note-search">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="txt-note">Từ khoá <b>{{$search}}</b> có {{number_format($result['video']['row_total'])}} kết quả</span>
                            </div>
                        </div>
                    </div>
                    @if($result['video']['data'])
                        <div class="row row10px float-col-width-video">
                            <?php
                            array_map(function ($item) {
                            ?>
                            <div class="col col col-md-3">
                                <div class="card card1 video">
                                    <div class="card-header" style="background-image: url({{$item['video_cover']}});">
                                        <a href="{{$item['video_link']}}" title="{{$item['video_title']}}">
                                            <span class="icon-play"></span>
                                        </a>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title"><a href="{{$item['video_link']}}" title="{{$item['video_title']}}" class="search_title" >{{$item['video_title']}}</a></h3>
                                        <p class="card-text"><?php echo $item['video_artist'] ?></p>
                                    </div>
                                </div>
                            </div>
                            <?php
                            }, $result['video']['data'])
                            ?>
                        </div>
                        <center><?php Helpers::pagingCustom($result['video']['page'], $result['video']['rows'], $result['video']['row_total'], '<a href="?q='.$search.'&page_video=%d">%d</a>') ?></center>
                    @endif
                </div>
                <div class="tab-pane fade {{isset($_GET['page_artist']) ? ' show active' : ''}}" id="nav-artist" role="tabpanel" aria-labelledby="nav-artist-tab">
                    <div class="card card-note-search">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="txt-note">Từ khoá <b>{{$search}}</b> có {{number_format($result['artist']['row_total'])}} kết quả</span>
                            </div>
                        </div>
                    </div>
                    @if($result['artist']['data'])
                        <ul class="list-unstyled list_music music_kq">
                            <?php
                            array_map(function ($item) {
                            ?>
                            <a class="search-line" href="{{$item['artist_link']}}" title="{{$item['artist_nickname']}}">
                            <li class="media align-items-stretch">
                                <div class="media-left align-items-stretch mr-2">
                                        <img src="{{$item['artist_cover']}}" alt="{{$item['artist_nickname']}}">
                                </div>
                                <div class="media-body align-self-center d-flex flex-column justify-content-between p-0">
                                    <div><h5 class="media-title mt-0 mb-0 span_h5">{{$item['artist_nickname']}}</h5></div>
                                </div>
                            </li></a>
                            <?php
                            }, $result['artist']['data'])
                            ?>
                        </ul>
                        <center><?php Helpers::pagingCustom($result['artist']['page'], $result['artist']['rows'], $result['artist']['row_total'], '<a href="?q='.$search.'&page_artist=%d">%d</a>') ?></center>
                    @endif
                </div>
            </div>

        </div>
        <div class="col-md-3">
        </div>
    </div>
</div>
@endsection
@section('contentJS')
<script>
    rawHighlight();
    function rawHighlight() {
        $('.search_title').each( function () {
            $(this).html(searchHighlight('<?php echo $search; ?>', $(this).text()));
        })
    }
</script>
@endsection
