<?php
use App\Library\Helpers;
$permisDelete = Auth::check() && backpack_user()->can('comment_(can_block)');
?>
<?php echo ($pagingHtml ? '<ul class="list-unstyled ul_comments">' : '') ?>
    <?php
    array_map(function ($item) use ($commentReply, $permisDelete) {
    ?>
        <li id="comment-{{$item['comment_id']}}" class="media comment-{{$item['comment_id']}} li-body-comment" style="width: 100%">
            <a href="/user/{{$item['user']['id']}}" title="{{$item['user']['name']}}"><img class="mr-3" src="<?php echo Helpers::pathThumbAvatar($item['user']['user_avatar'], $item['user']['id'], env('DATA_URL')) ?>" alt="{{$item['user']['name']}}"></a>
            <div class="media-body">
                <div class="body_commnet">
                    <div class="d-flex align-items-center justify-content-between">
                        <h5 class="media-title mt-0 mb-1"><a href="/user/{{$item['user']['id']}}" title="{{$item['user']['name']}}">{{$item['user']['name']}}</a>
                            @if($item['comment_jw_postion'])
                            ở <span class="seek-jw" data-postion="{{$item['comment_jw_postion']}}">{{ $item['comment_jw_postion'] >= 3600 ? gmdate("H:i:s", $item['comment_jw_postion']) : gmdate("i:s", $item['comment_jw_postion'])}}</span>
                            @endif
                        </h5>
                        <time class="comment_time"><?php echo Helpers::timeElapsedString($item['comment_time']); ?></time>
                        @if($permisDelete)
                            <div class="dropdown">
                                <a class="comment_delete" href="javascript:void(0)" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">...</a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item deleteComment" href="javascript:void(0)" onclick="deleteComment('comment', {{$item['comment_id']}}, 'delete')">Xóa</a>
                                    <a class="dropdown-item actionComment" href="javascript:void(0)" onclick="actionComment('comment', {{$item['comment_id']}}, '{{$item['comment_delete'] ? 'restore' : 'hidden'}}')">{{$item['comment_delete'] ? 'Phục hồi' : 'Ẩn'}}</a>
                                </div>
                            </div>
                        @else
                        <a class="comment_report" href="javascript:void(0)" onclick="reportComment('comment', {{$item['comment_id']}})">...</a>
                        @endif
                    </div>
                    <p class="media-text"><?php echo $item['comment_delete'] ? '<i>Bình luận này đã bị ẩn.</i>' : $item['comment_text']?></p>

                </div>
                <div class="comment-reply-{{$item['comment_id']}}">
                <?php
                    if($commentReply) {
                        foreach ($commentReply as $reply) {
                            if($reply['comment_id'] == $item['comment_id']){
                            ?>
                            <div class="media comment-reply-{{$reply['comment_reply_id']}}" id="comment-{{$reply['comment_reply_id']}}">
                                <a href="/user/{{$reply['user']['id']}}" title="{{$reply['user']['name']}}"><img class="mr-3" src="<?php echo Helpers::pathThumbAvatar($reply['user']['user_avatar'], $reply['user']['id'], env('DATA_URL')) ?>" alt="{{$reply['user']['name']}}"></a>
                                <div class="media-body media-body_commnet_replay">
                                    <div class="d-flex align-items-center justify-content-between body_commnet_replay">
                                        <h5 class="media-title mt-0 mb-1"><a href="/user/{{$reply['user']['id']}}" title="{{$reply['user']['name']}}">{{$reply['user']['name']}}</a>
                                            @if($item['comment_jw_postion'])
                                                ở <span class="seek-jw" data-postion="{{$reply['comment_jw_postion']}}">{{ $reply['comment_jw_postion'] >= 3600 ? gmdate("H:i:s", $reply['comment_jw_postion']) : gmdate("i:s", $reply['comment_jw_postion'])}}</span>
                                            @endif
                                        </h5>
                                        <time class="comment_time"><?php echo Helpers::timeElapsedString($reply['comment_time']); ?></time>
                                        @if($permisDelete)
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
                                    <p class="media-text"><?php echo $reply['comment_delete'] ? '<i>Bình luận này đã bị ẩn.</i>' : $reply['comment_text']?></p>
                                </div>
                            </div>
                            <?php
                            }
                        }
                    }
                ?></div>
                <div {{$item['comment_delete'] ? 'hidden' : ''}} class="reply_comment" data-comment_id="{{$item['comment_id']}}">Trả lời</div>
                <div class="post_comment_reply post_comment_reply_{{$item['comment_id']}}">
                    <form class="box_form_comment form-comment-{{$item['comment_id']}}">
                        <div class="form-group emoji-picker-container">
                            <textarea class="form-control comment" name="comment" rows="3" placeholder="Trả lời bình luận của bạn tại đây." data-emojiable="true"></textarea>
                            <input type="hidden" class="reply_cmt_id" name="reply_cmt_id" value="{{$item['comment_id']}}">
                            <button id="btn_cloud_up" class="btn btn-outline-success my-2 my-sm-0 waves-effect waves-light"  onclick="postComment({{$item['comment_id']}}, {{$item['user_id']}})" style="float: left; margin-top: 5px!important; margin-bottom: 10px!important; min-width: 75px;">Trả Lời</button>
                        </div>
                    </form>
                </div>
            </div>
        </li>
    <?php
    }, $comment['data']);
    ?>
<?php echo $pagingHtml ? '</ul>' : '' ?>
{{($pagingHtml ?? '')}}