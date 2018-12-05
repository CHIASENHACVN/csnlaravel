<?php
use App\Library\Helpers;
?>
    <?php
    array_map(function ($item) use ($commentReply) {
    ?>
    <div class="area_comment d-flex" id="comment-{{$item['comment_id']}}">
        <div align="top" class="avatar user_comment py-2">
            <a href="/user/{{$item['user']['id']}}"><img src="{{(strpos($item['user']['user_avatar'], 'http') !== false) ? $item['user']['user_avatar'] : Helpers::file_path($item['user']['id'], PUBLIC_AVATAR_PATH, true) . $item['user']['user_avatar']}}" alt="{{$item['user']['name']}}" alt=""></a>
        </div>
        <div class="content_comment text-left pl-2 py-2">
            <div class="item position_relative">
                <div class="body_comment">
                    <a href="/user/{{$item['user']['id']}}"><div class="infor"><strong class="author card-title">{{$item['user']['name']}}</strong><span class="text-gray">at</span>
                        <time>{{date('H:i', $item['comment_time'])}}</time>
                    </div></a>
                    <div class="detail">
                        <p>{{$item['comment_text']}}</p>
                    </div>
                    <div class="data_time text-gray text-right"><span><?php echo Helpers::timeElapsedString($item['comment_time']); ?></span></div>
                </div>
                <div class="block_form_comment"><a href="" class="reply_comment" data-comment_id="{{$item['comment_id']}}" >Trả lời</a>
                    <div class="post_comment_reply post_comment_reply_{{$item['comment_id']}}">
                        <form class="form_reply_comment form-comment-{{$item['comment_id']}}">
                            <div class="form-group mb-2">
                                <textarea rows="1" placeholder="Viết bình luận tại đây..." class="form-control p-2"></textarea>
                            </div>
                            <div class="form-group text-left m-0">
                                <button type="submit" onclick="postComment({{$item['comment_id']}})" class="btn btn-secondary btn-gradien btn-radius send-comment"><span>Gửi</span></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="post_comment_reply comment-reply-{{$item['comment_id']}}">
                    <div class="area_comment_reply d-flex">
                        <div align="top" class="avatar user_comment py-2"><img src="https://graph.facebook.com/v3.0/1928096143946677/picture?width=1920" alt=""></div>
                        <div class="content_comment text-left pl-2 py-2">
                            <div class="item position_relative">
                                <div class="body_comment">
                                    <div class="infor"><strong class="author">Quang vinh</strong><span class="text-gray">at</span>
                                        <time>00:02</time>
                                    </div>
                                    <div class="detail">
                                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                                    <div class="data_time text-gray text-left"><span>3 ngày trước</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="area_comment_reply d-flex">
                        <div align="top" class="avatar user_comment py-2"><img src="https://graph.facebook.com/v3.0/1928096143946677/picture?width=1920" alt=""></div>
                        <div class="content_comment text-left pl-2 py-2">
                            <div class="item position_relative">
                                <div class="body_comment">
                                    <div class="infor"><strong class="author">Quang vinh</strong><span class="text-gray">at</span>
                                        <time>00:02</time>
                                    </div>
                                    <div class="detail">
                                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                                    <div class="data_time text-gray text-right"><span>3 ngày trước</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="area_comment_reply d-flex">
                        <div align="top" class="avatar user_comment py-2"><img src="https://graph.facebook.com/v3.0/1928096143946677/picture?width=1920" alt=""></div>
                        <div class="content_comment text-left pl-2 py-2">
                            <div class="item position_relative">
                                <div class="body_comment">
                                    <div class="infor"><strong class="author">Quang vinh</strong><span class="text-gray">at</span>
                                        <time>00:02</time>
                                    </div>
                                    <div class="detail">
                                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                                    <div class="data_time text-gray text-right"><span>3 ngày trước</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                    if($commentReply) {
                        foreach ($commentReply as $reply) {
                            if($reply['comment_id'] == $item['comment_id']){
                            ?>
                            <div class="area_comment_reply d-flex">
                                <div align="top" class="avatar user_comment py-2">
                                    <a href="/user/{{$reply['user']['id']}}"><img src="{{(strpos($reply['user']['user_avatar'], 'http') !== false) ? $reply['user']['user_avatar'] : Helpers::file_path($reply['user']['id'], PUBLIC_AVATAR_PATH, true) . $reply['user']['user_avatar']}}" alt=""></a>
                                </div>
                                <div class="content_comment text-left pl-2 py-2">
                                    <div class="item position_relative">
                                        <div class="body_comment">
                                            <a href="/user/{{$reply['user']['id']}}"><div class="infor"><strong class="author">{{$reply['user']['name']}}</strong><span class="text-gray">at</span>
                                                <time>{{date('H:i', $reply['comment_time'])}}</time>
                                            </div></a>
                                            <div class="detail">
                                                <p>{{$reply['comment_text']}}</p>
                                            </div>
                                            <div class="data_time text-gray text-right"><span><?php echo Helpers::timeElapsedString($reply['comment_time']); ?></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php
                            }
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
    <?php
    }, $comment['data']);
    ?>
{{($pagingHtml ?? '')}}