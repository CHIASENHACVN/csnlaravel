@section('hidden_wapper', true)
<?php
$titleMeta = $playlistUser ? 'Cập nhật playlist - ' . $playlistUser->playlist_title : 'Thêm playlist mới';
$i = 1;
?>
@extends('layouts.app')
@section('contentCSS')
    <link rel="stylesheet" type="text/css" href="/css/croppie.css">
    <script type="text/javascript" src="/node_modules/sortablejs/Sortable.min.js"></script>
@endsection
@section('content')
    @include('user.box_profile', ['user' => Auth::user()])
    <div class="container">
        <div class="row row_wrapper">
            <div class="col-md-9">
                <div class="box_playlist border-0">
                    <h3 class="title">{{$playlistUser ? 'CẬP NHẬT PLAYLIST' : 'THÊM PLAYLIST'}}</h3>
                </div>
                @if ($message = Session::get('success'))
                    <div class="alert alert-success">
                        <strong>Thành công!</strong> {{ $message }}
                    </div>
                @endif
                <div class="card card_playlist">
                    <div class="card-body">
                        <form action="" method="post" accept-charset="utf-8" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="form-group row{{ $errors->has('playlist_title') ? ' has-error' : '' }}">
                                        <label for="artist_nickname" class="col-sm-4 col-form-label">Tên Playlist</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" value="{{ old('playlist_title') ?? (isset($playlistUser->playlist_title) ? $playlistUser->playlist_title : '') }}" id="playlist_title" name="playlist_title" placeholder="Nhập tên playlist của bạn">
                                            @if ($errors->has('playlist_title'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('playlist_title') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group row{{ $errors->has('playlist_cat_id') ? ' has-error' : '' }}">
                                        <label for="playlist_cat_id" class="col-sm-4 col-form-label">Thể Loại</label>
                                        <div class="col-sm-8">
                                            <select name="playlist_cat_id" id="playlist_cat_id" class="form-control" onchange="cat_level_reload(this.value);">
                                                @foreach($playlistCategory as $item)
                                                <option {{$playlistUser ? ($playlistUser->playlist_cat_id == $item->cat_id ? 'selected' : '') : ''}} value="{{$item->cat_id}}">{{$item->cat_title}}</option>
                                                @endforeach
                                            </select>
                                            @if ($errors->has('playlist_cat_id'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('playlist_cat_id') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group row{{ $errors->has('playlist_cat_level') ? ' has-error' : '' }}">
                                        <label for="playlist_cat_level" class="col-sm-4 col-form-label">Danh Mục</label>
                                        <div class="col-sm-8">
                                            <select name="playlist_cat_level" id="playlist_cat_level" class="form-control">
                                            </select>
                                        </div>
                                        @if ($errors->has('playlist_cat_level'))
                                            <span class="help-block">
                                                    <strong>{{ $errors->first('playlist_cat_level') }}</strong>
                                                </span>
                                        @endif
                                    </div>
                                    <div class="form-group row {{ $errors->has('playlist_cover') ? ' has-error' : '' }}">
                                        <div class="col-sm-4 col-form-label">
                                            <label for="artist_avatar">Cover</label> <br>
                                            <small>(Hình tối thiểu 500 x 500 pixels. Nếu nhỏ hơn sẽ bị mất hình và lấy hình mặc định của Chiasenhac)</small>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="media">
                                                <img class="mr-3" id="playlist_cover_uploaded" src="{{$playlistUser ? ($playlistUser->playlist_cover ? PUBLIC_MUSIC_PLAYLIST_PATH.$playlistUser->playlist_id . '.png?v=' . time() : '/imgs/avatar_default.png') : '/imgs/avatar_default.png' }}" alt="">
                                                <div class="media-body">
                                                    <div class="form-group">
                                                        <label for="choose_playlist_cover">Chọn file ảnh</label>
                                                        <input type="file" class="form-control-file" name="choose_playlist_cover" id="choose_playlist_cover">
                                                        <input type="text" hidden name="playlist_cover" value="" class="form-control-file" id="playlist_cover">
                                                        @if ($errors->has('playlist_cover'))
                                                            <span class="help-block">
                                                                <strong>{{ $errors->first('playlist_cover') }}</strong>
                                                            </span>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="playlist_music" class="col-sm-4 col-form-label">Danh sách bài hát</label>
                                        <div class="col-sm-8">
                                            <div class="card border-0" id="playlist_music">
                                                <ul class="list-group list-group-sortable" id="editable">
                                                    @foreach($playlistmusic as $item)
                                                        <li class="list-group-item d-flex align-items-center justify-content-between" id="{{$item['music']['music_id']}}"><span>{{$i++}}. <a class="name" href="#" title="">{{$item['music']['music_title']}}</a> - <?php echo '<a class="author" href="#">'.implode(',</a><a class="author" href="#">', explode(';', $item['music']['music_artist'])).'</a>' ?>
                                                            </span> <a class="delete js-remove" href="javascript:void(0)" title="xoá nhạc"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                                <input type="hidden" name="remove_music" class="playlist_remove_music" />
                                                <script type="text/javascript">
                                                    var el = document.getElementById('editable');
                                                    var sortable = Sortable.create(el,{
                                                        filter: '.js-remove',
                                                        onFilter: function (evt) {
                                                            $('.playlist_remove_music').val($('.playlist_remove_music').val() + ',' + evt.item.id)
                                                            evt.item.parentNode.removeChild(evt.item);
                                                        }
                                                    });
                                                </script>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <input type="hidden" name="sumbit_action" id="sumbit_action" value="{{$playlistUser ? 'edit' : 'create'}}">
                            <input type="hidden" name="playlist_id" id="playlist_id" value="{{$playlistUser ? $playlistUser->playlist_id : ''}}">
                            <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="form-group row">
                                        <div class="col-sm-8">
                                            <label for="inputPassword" class="col-sm-4 col-form-label"></label>
                                            <button type="submit" class="btn btn-primary btn-lg">{{$playlistUser ? 'Lưu' : 'Thêm'}}</button>
                                            <button type="button" class="btn btn-primary btn-lg" onclick="return remove_artist();" >Trở lại</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
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
    <div id="uploadimageModal" class="modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Cắt sửa ảnh</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-10 text-center">
                            <div id="image_demo" style="width:470px; margin-top:30px"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success crop_image">Cắt ảnh</button>
                    <button class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/js/croppie.js"></script>
    <script>
        $(document).ready(function(){

            $('#choose_playlist_cover').on('change', function(){
                $('#image_demo').html('');
                $('.modal-dialog').css("max-width", "500px")
                $image_crop = $('#image_demo').croppie({
                    enableExif: true,
                    viewport: {
                        width:300,
                        height:300,
                        type:'square' //circle
                    },
                    boundary:{
                        width:300,
                        height:300
                    },
                    showZoomer: false,
                    enableOrientation: true,
                    mouseWheelZoom: '',
                });
                var reader = new FileReader();
                reader.onload = function (event) {
                    $image_crop.croppie('bind', {
                        url: event.target.result
                    }).then(function(){
                        console.log('jQuery bind complete');
                    });
                }
                reader.readAsDataURL(this.files[0]);
                $('#uploadimageModal').modal('show');
            });
            $('.crop_image').click(function(event){
                $image_crop.croppie('result', {
                    type: 'canvas',
                    size: 'viewport'
                }).then(function (response) {
                    const info = $image_crop.croppie('get');
                    $('#uploadimageModal').modal('hide');
                    $('#playlist_cover').val(response);
                    $('#playlist_cover_uploaded').attr("src", response);
                })
            });

        });
        function remove_artist() {
            window.location.replace('/user/playlist/chinh-sua');
        }
        var cat_id_selected = <?php echo old('playlist_cat_id') ?? ($playlistUser ? $playlistUser->playlist_cat_id : 1) ?>;
        cat_level_reload(cat_id_selected);
        function cat_level_reload(cat_id)
        {
            cat_id_selected = cat_id;
            document.getElementById('playlist_cat_level').options.length = 0;
            <?php
                foreach ($playlistCategory as $item) {
                    ?>
                    if (cat_id == <?php echo $item->cat_id ?>) {
                        <?php
                        $i = 0;
                        foreach ($playlistLevel as $itemLevel){
                            if($itemLevel->cat_id == $item->cat_id){
                                ?>
                                document.getElementById('playlist_cat_level').options[<?php echo $i++ ?>]=new Option("<?php echo $itemLevel->cat_title ?>", "<?php echo $itemLevel->cat_level ?>", false, false);
                                <?php
                            }
                        }
                        ?>
                    }
                    <?php
                }
            ?>

        }
        document.getElementById('playlist_cat_level').value = <?php echo old('playlist_cat_level') ?? ($playlistUser ? $playlistUser->playlist_cat_level : 0) ?>;
    </script>
@endsection
