<?php
use App\Library\Helpers;
$perPage = $musicFavourite->toArray()['per_page'];
$curentPage = $musicFavourite->toArray()['current_page'];
$data = $musicFavourite->toArray()['data'];
$idAuth = Auth::check() ? Auth::user()->id : 0;
?>
@if($data)
    <div class="row row10px">
        <div class="col">
            <ul class="list-unstyled list_music">
                <?php
                array_map(function($i, $item) use($perPage, $curentPage, $idAuth) {
                if($i < 5) {
                $userFav = $item['user_id'];
                $item = $item['music'];
                $url = Helpers::listen_url($item);
                ?>
                <li class="media align-items-stretch items-stretch-{{$item['music_id']}}">
                    <div class="media_tmp align-self-center d-flex align-items-center mr-3 pl-3">
                        <span class="counter">{{sprintf("%02d", (($curentPage - 1) * $perPage) + ++$i)}}</span>
                    </div>
                    <div class="media-left align-items-stretch mr-2">
                        <a href="{{$url}}" title="{{$item['music_title']}}">
                            <img src="{{Helpers::cover_url($item['cover_id'])}}" alt="{{$item['music_title']}}">
                            <i class="material-icons">play_circle_outline</i>
                        </a>
                    </div>
                    <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                        <div>
                            <h5 class="media-title mt-0 mb-0 title_home_tablet"><a href="{{$url}}" title="{{$item['music_shortlyric'] ?? $item['music_title']}}">{{$item['music_title']}}</a></h5>
                            <div class="author title_home_tablet"><?php echo Helpers::rawHtmlArtists($item['music_artist_id'], $item['music_artist']) ?></div>
                        </div>
                        <small class="type_music"><?php echo Helpers::bitrate2str($item['music_bitrate']); ?></small>
                    </div>
                    <div class="media-right align-self-center">
                        <ul class="list-inline" style="margin-right:0px">
                            <li class="list-inline-item">
                                <a href="javascript:void(0)" data-type_jw="music" data-music_title="{{$item['music_title']}}" data-music_id="{{$item['music_id']}}" class="wishlist toggle_wishlist {{$userFav == $idAuth ? 'selector' : ''}} px-3"><i aria-hidden="true" class="fa fa-heart-o"></i></a>
                            </li>
                        </ul>
                    </div>
                </li>
                <?php
                }
                }, array_keys($data), $data);
                ?>
            </ul>
        </div>
        <div class="col">
            <ul class="list-unstyled list_music">
                <?php
                array_map(function($i, $item) use($perPage, $curentPage, $idAuth) {
                if($i >= 5) {
                $userFav = $item['user_id'];
                $item = $item['music'];
                $url = Helpers::listen_url($item);
                ?>
                <li class="media align-items-stretch items-stretch-{{$item['music_id']}}">
                    <div class="media_tmp align-self-center d-flex align-items-center mr-3 pl-3">
                        <span class="counter">{{sprintf("%02d", (($curentPage - 1) * $perPage) + ++$i)}}</span>
                    </div>
                    <div class="media-left align-items-stretch mr-2">
                        <a href="{{$url}}" title="{{$item['music_title']}}">
                            <img src="{{Helpers::cover_url($item['cover_id'])}}" alt="{{$item['music_title']}}">
                            <i class="material-icons">play_circle_outline</i>
                        </a>
                    </div>
                    <div class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                        <div>
                            <h5 class="media-title mt-0 mb-0 title_home_tablet"><a href="{{$url}}" title="{{$item['music_shortlyric'] ?? $item['music_title']}}">{{$item['music_title']}}</a></h5>
                            <div class="author title_home_tablet"><?php echo Helpers::rawHtmlArtists($item['music_artist_id'], $item['music_artist']) ?></div>
                        </div>
                        <small class="type_music"><?php echo Helpers::bitrate2str($item['music_bitrate']); ?></small>
                    </div>
                    <div class="media-right align-self-center">
                        <ul class="list-inline" style="margin-right:0px">
                            <li class="list-inline-item">
                                <a href="javascript:void(0)" data-type_jw="music" data-music_title="{{$item['music_title']}}" data-music_id="{{$item['music_id']}}" class="wishlist toggle_wishlist toggle_wishlist_music {{$userFav == $idAuth ? 'selector' : ''}} px-3"><i aria-hidden="true" class="fa fa-heart-o"></i></a>
                            </li>
                        </ul>
                    </div>
                </li>
                <?php
                }
                }, array_keys($data), $data);
                ?>
            </ul>
        </div>
    </div>
    <center>{{$musicFavourite->links()}}</center>
    <script>
        $('.toggle_wishlist').click(function(e) {
            <?php
            if(!Auth::check()) {
            ?>
            switchAuth('myModal_login');
            return false;
            <?php
            }
            ?>
            e.preventDefault();
            let falgFav = $(this).hasClass('selector');
            $.ajax({
                url: '/music/favourite',
                type: "POST",
                dataType: "json",
                data: {
                    'type': falgFav,
                    'type_of': $(this).data('type_jw'),
                    'name': $(this).data('music_title'),
                    'music_id' : $(this).data('music_id'),
                },
                beforeSend: function () {
                    if(loaded) return false;
                    loaded = true;
                },
                success: function(response) {
                    if(response.success) {
                    }else {
                        alertModal(data.message);
                    }
                }
            });
            $(this).toggleClass('selector');
        });
    </script>
@else
    <div class="center-text-mes"><span>Chưa có bài nhạc nào</span></div>
@endif