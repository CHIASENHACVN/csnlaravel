<?php
use App\Library\Helpers;
?>
<sectiton class="block_popup">
    @yield('popupMusic')
    <div id="alertModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade">
        <div role="document" class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal_content_csn">Lần đăng nhập với tài khoản facebook hoặc google sẽ cập nhật thêm thông tin tên tài khoản và mật khẩu.</div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn">Ok</button>
                </div>
            </div>
        </div>
    </div>
    <div class="menumain">
        <div id="navbar_main_header_top">
            @if(Auth::check())
            <div class="profile">
                <a href="{{env('APP_URL')}}/user/{{Auth::user()->id}}"><div style="background: url(<?php echo Helpers::pathAvatar(Auth::user()->user_avatar, Auth::user()->id) ?>) no-repeat center;background-size: cover;" class="image mr-3 d-inline-block align-middle rounded-circle"></div>
                    <div class="content d-inline-block align-middle">
                        <h5 class="text-white">{{Auth::user()->name}}</h5>
                        <p class="text-gray m-0">{{Auth::user()->email}}</p>
                    </div></a>
            </div>
            @endif
            <ul class="navbar-nav">
                <li class="nav-item">
                    <h2>Tài khoản</h2>
                </li>
                @if(!Auth::check())
                    <li class="nav-item"><a href="/login?back_url={{$_SERVER['REQUEST_URI']}}" class="nav-link dropdown-toggle"><img src="/images/ic_menu_user.png" alt="user" class="icon"> Đăng nhập</a></li>
                @else
                    <li class="nav-item"><a href="/logout" class="nav-link dropdown-toggle"><img src="/images/ic_menu_out.png" alt="user" class="icon"> Thoát</a></li>
                    <li class="nav-item"><a href="/user/{{Auth::user()->id}}" class="nav-link dropdown-toggle"><img src="/images/ic_menu_playlist.png" alt="playlist" class="icon"> Playlist</a></li>
                    <li class="nav-item"><a href="#" class="nav-link dropdown-toggle"><img src="/images/ic_menu_clock.png" alt="playlist" class="icon"> Bài hát vừa nghe</a></li>
                    <li class="nav-item"><a href="/user/{{Auth::user()->id}}/?tab=bai-hat" class="nav-link dropdown-toggle"><img src="/images/ic_menu_rating.png" alt="playlist" class="icon"> Bài hát yêu thích</a></li>
                    <li class="nav-item"><a href="/user/{{Auth::user()->id}}/?tab=tu-nhac" class="nav-link dropdown-toggle"><img src="/images/CSN.png" alt="playlist" class="icon"> Tủ nhạc</a></li>
                @endif
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <h2>NHẠC ONLINE</h2>
                </li>
                <li class="nav-item"><a href="/" class="nav-link dropdown-toggle"><img src="/images/ic_menu_home.png" alt="playlist" class="icon"> Trang chủ</a></li>
                <li class="nav-item"><a href="/nhac-hot.html?type=music" class="nav-link dropdown-toggle"><img src="/images/ic_menu_bxh.png" alt="playlist" class="icon"> Bảng Xếp Hạng Bài Hát</a></li>
                <li class="nav-item"><a href="/nhac-hot.html?type=video" class="nav-link dropdown-toggle"><img src="/images/ic_menu_bxh.png" alt="playlist" class="icon"> Bảng Xếp Hạng Video</a></li>
                <li class="nav-item"><a href="/mp3/vietnam.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_music_active.png" alt="playlist" class="icon"> Việt Nam</a></li>
                <li class="nav-item"><a href="/mp3/us-uk.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_music_active.png" alt="playlist" class="icon"> US-UK</a></li>
                <li class="nav-item"><a href="/mp3/korea.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_music_active.png" alt="playlist" class="icon"> K-Pop</a></li>
                <li class="nav-item"><a href="/mp3/japan.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_music_active.png" alt="playlist" class="icon"> J-Pop</a></li>
                <li class="nav-item"><a href="/mp3/chinese.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_music_active.png" alt="playlist" class="icon"> C-Pop</a></li>
                <li class="nav-item"><a href="/mp3/france.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_music_active.png" alt="playlist" class="icon"> F-Pop</a></li>
                <li class="nav-item"><a href="/mp3/other.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_music_active.png" alt="playlist" class="icon"> Nước khác</a></li>
                <li class="nav-item"><a href="/mp3/beat-playback.html" class="nav-link dropdown-toggle"><img src="/images/ic_menu_other.png" alt="playlist" class="icon"> Playback</a></li>
            </ul>
        </div>
    </div>
    <div class="wrap-search">
        <div class="block_search_fixed">
            <input type="text" placeholder="Search" class="input_search">
            <div class="button_close"><span>Hủy</span></div>
        </div>
        <div class="block_search_result">
            <div class="container">
                <div class="block block_baihat">
                    <div class="block_header d-flex flex-row justify-content-between mb-2">
                        <h3 class="main_title text-pink mb-0">Bài hát</h3><span class="text-gray align-self-end">Xem tất cả</span>
                    </div>
                    <div class="block_baihat_main block_more">
                        <div class="element mb-2">
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Trong trí nhớ của anh</h6>
                                <p class="name_singer text-gray mb-1">Hạnh Sino</p>
                                <p class="loss text-pink mb-0">Lossless</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                        <div class="element mb-2">
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Trong trí nhớ của anh</h6>
                                <p class="name_singer text-gray mb-1">Hạnh Sino</p>
                                <p class="loss text-pink mb-0">Lossless</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block block_album">
                    <div class="block_header d-flex flex-row justify-content-between mb-2">
                        <h3 class="main_title text-pink mb-0">Album</h3><span class="text-gray align-self-end">Xem tất cả</span>
                    </div>
                    <div class="block_baihat_main block_more">
                        <div class="element mb-2">
                            <div style="background : url('https://zmp3-photo.zadn.vn/thumb/240_240/cover/d/5/a/b/d5ab15666207be0eafa55757ce67dad8.jpg') no-repeat center;background-size: cover;" class="image100 mr-2 d-inline-block align-middle"></div>
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Trong trí nhớ của anh</h6>
                                <p class="name_singer text-gray mb-1">Hạnh Sino</p>
                                <p class="loss text-pink mb-0">Lossless</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                        <div class="element mb-2">
                            <div style="background : url('https://zmp3-photo.zadn.vn/thumb/240_240/cover/d/5/a/b/d5ab15666207be0eafa55757ce67dad8.jpg') no-repeat center;background-size: cover;" class="image100 mr-2 d-inline-block align-middle"></div>
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Trong trí nhớ của anh</h6>
                                <p class="name_singer text-gray mb-1">Hạnh Sino</p>
                                <p class="loss text-pink mb-0">Lossless</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                        <div class="element mb-2">
                            <div style="background : url('https://zmp3-photo.zadn.vn/thumb/240_240/cover/d/5/a/b/d5ab15666207be0eafa55757ce67dad8.jpg') no-repeat center;background-size: cover;" class="image100 mr-2 d-inline-block align-middle"></div>
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Trong trí nhớ của anh</h6>
                                <p class="name_singer text-gray mb-1">Hạnh Sino</p>
                                <p class="loss text-pink mb-0">Lossless</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block block_video">
                    <div class="block_header d-flex flex-row justify-content-between mb-2">
                        <h3 class="main_title text-pink mb-0">Video</h3><span class="text-gray align-self-end">Xem tất cả</span>
                    </div>
                    <div class="block_baihat_main block_more">
                        <div class="element mb-2">
                            <div style="background : url('https://zmp3-photo.zadn.vn/thumb/240_240/cover/d/5/a/b/d5ab15666207be0eafa55757ce67dad8.jpg') no-repeat center;background-size: cover;" class="image100 mr-2 d-inline-block align-middle">
                                <p class="time text-white mb-0 px-2 py-1"><img src="/images/ic_menu_clock.png" width="14"> 03:45</p>
                            </div>
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Bad and Boujee</h6>
                                <p class="name_singer text-gray mb-1">Migo(feat. Lil Uzi Vert)</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                        <div class="element mb-2">
                            <div style="background : url('https://zmp3-photo.zadn.vn/thumb/240_240/cover/d/5/a/b/d5ab15666207be0eafa55757ce67dad8.jpg') no-repeat center;background-size: cover;" class="image100 mr-2 d-inline-block align-middle">
                                <p class="time text-white mb-0 px-2 py-1"><img src="/images/ic_menu_clock.png" width="14"> 03:45</p>
                            </div>
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Bad and Boujee</h6>
                                <p class="name_singer text-gray mb-1">Migo(feat. Lil Uzi Vert)</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                        <div class="element mb-2">
                            <div style="background : url('https://zmp3-photo.zadn.vn/thumb/240_240/cover/d/5/a/b/d5ab15666207be0eafa55757ce67dad8.jpg') no-repeat center;background-size: cover;" class="image100 mr-2 d-inline-block align-middle">
                                <p class="time text-white mb-0 px-2 py-1"><img src="/images/ic_menu_clock.png" width="14"> 03:45</p>
                            </div>
                            <div class="content d-inline-block align-middle">
                                <h6 class="name_song text-black mb-1">Bad and Boujee</h6>
                                <p class="name_singer text-gray mb-1">Migo(feat. Lil Uzi Vert)</p><img src="/images/img_dot_gray.png" class="icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</sectiton>
<footer>

</footer>
<script src="/mobile/assets/js/bootstrap.min.js"></script>
<script src="/mobile/assets/js/owl.carousel.min.js"></script>
<script src="/mobile/assets/js/swiper.jquery.min.js"></script>
<script src="/mobile/assets/js/main.js"></script>
<script src="/mobile/assets/js/functions.js"></script>
