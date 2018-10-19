<header id="header" class="">
    <div class="top">
        <div class="container">
            <div class="d-flex align-items-center justify-content-between">
                <figure class="m-0">
                    <a href="{{env('APP_URL')}}/" title="" class="logo">
                        <img src="/imgs/logo-web-official.png" style="padding-left: 15px;" />
                    </a>
                    <figcaption class="d-none">explanatory caption</figcaption>
                </figure>
                <form action="{{env('APP_URL')}}/tim-kiem">
                    <div class="form-group m-0">
                        <i class="material-icons">search</i>
                        <input type="text" name="q" class="form-control" value="{{(isset($search) ? $search : '')}}"  class="biginput" id="search_autocomplete" placeholder="nhập bài hát, video, tên nghệ sỹ bạn cần tìm...">
                        <div class="search_layout card suggest">
                        </div>
                    </div>
                </form>
                <ul class="list-inline m-0">
                    @if(Auth::check())
                        <li class="list-inline-item"><a href="{{env('APP_URL')}}/user/{{Auth::user()->id}}" title="{{Auth::user()->name}}">{{Auth::user()->name}}</a></li>
                        <li class="list-inline-item">/</li>
                        <li class="list-inline-item"><a href="{{env('APP_URL')}}/logout" title="Đăng ký">Thoát</a></li>
                    @else
                        <li class="list-inline-item"><a href="javascript:void(0)" onclick="switchAuth('myModal_login')" title="Đăng nhập">Đăng nhập</a></li>
                        <li class="list-inline-item">/</li>
                        <li class="list-inline-item"><a href="javascript:void(0)" onclick="switchAuth('myModal_register')" title="Đăng ký">Đăng ký</a></li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
    <nav class="bottom navbar navbar-expand-lg navbar-light bg-light ghw-bottom-header">
        <div class="collapse navbar-collapse container" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#">Xếp hạng</a>
                    <ul class="dropdown-menu list-unstyled">
                        <li><a href="{{env('APP_URL')}}/nhac-hot.html" title="">BXH hôm nay</a></li>
                        <li><a href="{{env('APP_URL')}}/bang-xep-hang/tuan.html" title="BXH tuần này">BXH tuần này</a></li>
                        <li><a href="{{env('APP_URL')}}/bang-xep-hang/thang-09-2018.html" title="BXH tháng 9">BXH tháng 9</a></li>
                        <li><a href="{{env('APP_URL')}}/bang-xep-hang/nam-2017.html" title="BXH năm 2017">BXH năm 2017</a></li>
                        <li><a href="{{env('APP_URL')}}/bang-xep-hang/nam-2018.html" title="BXH năm 2018">BXH năm 2018</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/hd/video.html">Video Clip</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/vietnam.html">Việt Nam</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/us-uk.html">US-UK</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/chinese.html">Nhạc Hoa</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/korea.html">Nhạc Hàn</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/japan.html">Nhạc Nhật</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/france.html">Nhạc Pháp</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/other.html">Nước khác</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{env('APP_URL')}}/mp3/beat-playback.html">Playback</a>
                </li>
                <li class="nav-item this_more">
                    <a class="nav-link iconmenu" href="#"><i class="material-icons">more_horiz</i></a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <a href="{{env('APP_URL')}}/dang-tai" style="text-decoration: none;" title=""><button id="btn_cloud_up" class="btn btn-outline-success my-2 my-sm-0 waves-effect waves-light" type="button"><i class="material-icons">cloud_upload</i> Upload</button></a>
            </form>
        </div>
        <div id="menu-expand" class="menu-expand-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">xếp hạng</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/nhac-hot.html" title="">BXH hôm nay</a></li>
                                <li><a href="{{env('APP_URL')}}/bang-xep-hang/tuan.html" title="BXH tuần này">BXH tuần này</a></li>
                                <li><a href="{{env('APP_URL')}}/bang-xep-hang/thang-09-2018.html" title="BXH tháng 9">BXH tháng 9</a></li>
                                <li><a href="{{env('APP_URL')}}/bang-xep-hang/nam-2017.html" title="BXH năm 2017">BXH năm 2017</a></li>
                                <li><a href="{{env('APP_URL')}}/bang-xep-hang/nam-2018.html" title="BXH năm 2018">BXH năm 2018</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">video clip</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/hd/video/v-video.html" title="Video Việt Nam">Video Việt Nam</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/us-video.html" title="Video US-UK">Video US-UK</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/c-video.html" title="Video Hoa">Video Hoa</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/k-video.html" title="Video Hàn">Video Hàn</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/l-video.html" title="Video Live">Video Live</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/h-video.html" title="Video Hài">Video Hài</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/j-video.html" title="Video Nhật">Video Nhật</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/f-video.html" title="Video Pháp">Video Pháp</a></li>
                                <li><a href="{{env('APP_URL')}}/hd/video/o-video.html" title="Video Nước Khác">Video Nước Khác</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">Việt Nam</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/vietnam/v-pop.html" title="Nhạc pop, rock...">Nhạc pop, rock...</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/vietnam/v-rap-hiphop.html" title="Nhạc rap, hiphop">Nhạc rap, hiphop</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/vietnam/v-dance-remix.html" title="Nhạc dance, remix">Nhạc dance, remix</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/vietnam/v-truyen-thong.html" title="Nhạc truyền thống">Nhạc truyền thống</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">US-UK</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/us-uk/us-pop.html" title="Nhạc pop, rock...">Nhạc pop, rock...</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/us-uk/us-rap-hiphop.html" title="Nhạc rap, hiphop">Nhạc rap, hiphop</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/us-uk/us-dance-remix.html" title="Nhạc dance, remix">Nhạc dance, remix</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">Nhạc Hoa</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/chinese/c-pop.html" title="Nhạc pop, rock...">Nhạc pop, rock...</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/chinese/c-rap-hiphop.html" title="Nhạc rap, hiphop">Nhạc rap, hiphop</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/chinese/c-dance-remix.html" title="Nhạc dance, remix">Nhạc dance, remix</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">Nhạc Hàn</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/korea/k-pop.html" title="Nhạc pop, rock...">Nhạc pop, rock...</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/korea/k-rap-hiphop.html" title="Nhạc rap, hiphop">Nhạc rap, hiphop</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/korea/k-dance-remix.html" title="Nhạc dance, remix">Nhạc dance, remix</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">Nhạc Nhật</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/japan/j-pop.html" title="Nhạc pop, rock...">Nhạc pop, rock...</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/japan/j-rap-hiphop.html" title="Nhạc rap, hiphop">Nhạc rap, hiphop</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/japan/j-dance-remix.html" title="Nhạc dance, remix">Nhạc dance, remix</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">Nhạc Pháp</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/france/f-pop.html" title="Nhạc pop, rock...">Nhạc pop, rock...</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/france/f-rap-hiphop.html" title="Nhạc rap, hiphop">Nhạc rap, hiphop</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/france/f-dance-remix.html" title="Nhạc dance, remix">Nhạc dance, remix</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">Nước Khác</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/other/o-pop.html" title="Nhạc pop, rock...">Nhạc pop, rock...</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/other/o-rap-hiphop.html" title="Nhạc rap, hiphop">Nhạc rap, hiphop</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/other/o-dance-remix.html" title="Nhạc dance, remix">Nhạc dance, remix</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box_item">
                            <h3 class="title">playback</h3>
                            <ul class="list-unstyled">
                                <li><a href="{{env('APP_URL')}}/mp3/beat-playback/v-instrumental.html" title="Playback Việt Nam">Playback Việt Nam</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/beat-playback/us-instrumental.html" title="Playback US-UK">Playback US-UK</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/beat-playback/c-instrumental.html" title="Playback Hoa">Playback Hoa</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/beat-playback/k-instrumental.html" title="Playback Hàn">Playback Hàn</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/beat-playback/j-instrumental.html" title="Playback Nhật">Playback Nhật</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/beat-playback/f-instrumental.html" title="Playback Pháp">Playback Pháp</a></li>
                                <li><a href="{{env('APP_URL')}}/mp3/beat-playback/o-instrumental.html" title="Playback Nước Khác">Playback Nước Khác</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col"></div>
                    <div class="col"></div>
                </div>
            </div>
        </div>
    </nav>
</header>
