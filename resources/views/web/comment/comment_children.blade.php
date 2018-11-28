<?php
use App\Library\Helpers;
?>
<div class="media">
    <a href="/user/{{$reply['user']['id']}}" title="{{$reply['user']['name']}}"><img class="mr-3" src="{{(strpos($reply['user']['user_avatar'], 'http') !== false) ? $reply['user']['user_avatar'] : Helpers::file_path($reply['user']['id'], PUBLIC_AVATAR_PATH, true) . $reply['user']['user_avatar']}}" alt="{{$reply['user']['user_avatar']}}"></a>
    <div class="media-body">
        <div class="d-flex align-items-center justify-content-between">
            <h5 class="media-title mt-0 mb-1"><a href="/user/{{$reply['user']['id']}}" title="{{$reply['user']['name']}}">{{$reply['user']['name']}}</a> at <span>{{date('H:i', $reply['comment_time'])}}</span></h5>
            <time><?php echo Helpers::timeElapsedString($reply['comment_time']); ?></time>
        </div>
        <p class="media-text">{{$reply['comment_text']}}</p>
    </div>
</div>