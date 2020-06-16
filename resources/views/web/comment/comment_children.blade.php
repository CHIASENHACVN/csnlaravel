<?php
use App\Library\Helpers;
?>
<div class="media comment-reply-{{$reply['comment_reply_id']}}" id="comment-{{$reply['comment_reply_id']}}">
    <a href="/user/{{$reply['user']['id']}}" title="{{$reply['user']['name']}}"><img class="mr-3" src="<?php echo Helpers::pathAvatar($reply['user']['user_avatar'], $reply['user']['id']) ?>" alt="{{$reply['user']['user_avatar']}}"></a>
    <div class="media-body">
        <div class="d-flex align-items-center justify-content-between body_commnet_replay">
            <h5 class="media-title mt-0 mb-1"><a href="/user/{{$reply['user']['id']}}" title="{{$reply['user']['name']}}">{{$reply['user']['name']}}</a>
                @if($reply['comment_jw_postion'])
                    at <span class="seek-jw" data-postion="{{$reply['comment_jw_postion']}}">{{ $reply['comment_jw_postion'] >= 3600 ? gmdate("H:i:s", $reply['comment_jw_postion']) : gmdate("i:s", $reply['comment_jw_postion'])}}</span>
                @endif
            </h5>
            <time class="comment_time"><?php echo Helpers::timeElapsedString($reply['comment_time']); ?></time>
            @if(Auth::check() && backpack_user()->can('comment_(can_block)'))
                <div class="dropdown">
                    <a class="comment_delete" href="javascript:void(0)" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">...</a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item deleteComment" href="javascript:void(0)" onclick="deleteComment('comment-reply', {{$reply['comment_reply_id']}}, 'delete')">Xóa</a>
                        <a class="dropdown-item actionComment" href="javascript:void(0)" onclick="actionComment('comment-reply', {{$reply['comment_reply_id']}}, '{{$reply['comment_delete'] ? 'restore' : 'hidden'}}')">{{$reply['comment_delete'] ? 'Phục hồi' : 'Ẩn'}}</a>
                    </div>
                </div>
            @else
            <a class="comment_report" href="javascript:void(0)" onclick="reportComment('comment-reply', {{$reply['comment_reply_id']}})">...</a>
            @endif
        </div>
        <p class="media-text"><?php echo $reply['comment_delete'] ? '<i>Bình luận này đã bị ẩn.</i>' : $reply['comment_text'] ?></p>
    </div>
</div>