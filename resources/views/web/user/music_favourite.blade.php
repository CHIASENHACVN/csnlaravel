<?php
use App\Library\Helpers;
$perPage = $musicFavourite->toArray()['per_page'];
$curentPage = $musicFavourite->toArray()['current_page'];
$data = $musicFavourite->toArray()['data'];
?>
@if($data)
    <div class="row row10px">
        <div class="col">
            <ul class="list-unstyled list_music">
                <?php
                array_map(function($i, $item) use($perPage, $curentPage) {
                if($i < 5) {
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
                array_map(function($i, $item) use($perPage, $curentPage) {
                if($i >= 5) {
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
                </li>
                <?php
                }
                }, array_keys($data), $data);
                ?>
            </ul>
        </div>
    </div>
    <center>{{$musicFavourite->links()}}</center>
@else
    <div class="center-text-mes"><span>Chưa có bài nhạc nào</span></div>
@endif