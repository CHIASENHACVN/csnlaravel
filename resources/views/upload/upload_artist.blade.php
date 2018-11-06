@section('hidden_wapper', true)
<?php
    $titleMeta = 'cập nhật nghệ sĩ mới - ' . Config::get('constants.app.title');
?>
@extends('layouts.app')
@section('contentCSS')
    <link rel="stylesheet" type="text/css" href="/css/croppie.css">
@endsection
@section('content')
    @include('user.box_profile', ['user' =>  Auth::user()])
    <div class="container">
        <div class="row row_wrapper">
            <div class="col-md-9">
                <div class="box_playlist border-0">
                    <h3 class="title">UPLOAD ARTIST</h3>
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
                                    <div class="form-group row{{ $errors->has('artist_nickname') ? ' has-error' : '' }}">
                                        <label for="artist_nickname" class="col-sm-4 col-form-label">Nghệ Danh</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" value="{{ old('artist_nickname') }}" id="artist_nickname" name="artist_nickname" placeholder="Blooming Days - The 2nd Mini Album">
                                            @if ($errors->has('artist_nickname'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('artist_nickname') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group row {{ $errors->has('artist_birthday') ? ' has-error' : '' }}">
                                        <label for="artist_birthday" class="col-sm-4 col-form-label">Ngày Sinh</label>
                                        <div class="col-sm-8">
                                            <input type="date" name="artist_birthday" class="form-control" value="{{ old('artist_birthday') }}" id="artist_birthday">
                                            @if ($errors->has('artist_birthday'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('artist_birthday') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="artist_gender" class="col-sm-4 col-form-label">Giới Tính</label>
                                        <div class="col-sm-8">
                                            <select name="artist_gender" id="artist_gender" class="form-control">
                                                <option {{ (old('artist_gender') == 0 ? 'selected' : '') }} value="0">Nam</option>
                                                <option {{ (old('artist_gender') == 1 ? 'selected' : '') }} value="1">Nữ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row {{ $errors->has('artist_avatar') ? ' has-error' : '' }}">
                                        <div class="col-sm-4 col-form-label">
                                            <label for="artist_avatar">Avatar</label> <br>
                                            <small>(Hình tối thiểu 500 x 500 pixels. Nếu nhỏ hơn sẽ bị mất hình và lấy hình mặc định của Chiasenhac)</small>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="media">
                                                <img class="mr-3" id="artist_avatar_uploaded" src="/imgs/avatar_default.png" alt="">
                                                <div class="media-body">
                                                    <div class="form-group">
                                                        <label for="choose_artist_avatar">Chọn file ảnh</label>
                                                        <input type="file" class="form-control-file" name="choose_artist_avatar" id="choose_artist_avatar">
                                                        <input type="text" hidden name="artist_avatar" class="form-control-file" id="artist_avatar">
                                                        @if ($errors->has('artist_avatar'))
                                                            <span class="help-block">
                                                                <strong>{{ $errors->first('artist_avatar') }}</strong>
                                                            </span>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row {{ $errors->has('artist_cover') ? ' has-error' : '' }}">
                                        <div class="col-sm-4 col-form-label">
                                            <label for="choose_artist_cover">Cover</label> <br>
                                            <small>(Hình tối thiểu 1170 x 300 pixels. Nếu nhỏ hơn sẽ bị mất hình và lấy hình mặc định của Chiasenhac)</small>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="media">
                                                <img class="mr-3" id="artist_cover_uploaded" src="/imgs/avatar_default.png" alt="">
                                                <div class="media-body">
                                                    <div class="form-group">
                                                        <label for="choose_artist_cover">Chọn file ảnh</label>
                                                        <input type="file" class="form-control-file" name="choose_artist_cover" id="choose_artist_cover">
                                                        <input type="text" hidden name="artist_cover" class="form-control-file" id="artist_cover">
                                                        @if ($errors->has('artist_cover'))
                                                            <span class="help-block">
                                                                <strong>{{ $errors->first('artist_cover') }}</strong>
                                                            </span>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="artist_avatar_crop_x" id="artist_avatar_crop_x" value="">
                            <input type="hidden" name="artist_avatar_crop_y" id="artist_avatar_crop_y" value="">
                            <input type="hidden" name="artist_cover_crop_x" id="artist_cover_crop_x" value="">
                            <input type="hidden" name="artist_cover_crop_y" id="artist_cover_crop_y" value="">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="form-group row">
                                        <label for="inputPassword" class="col-sm-4 col-form-label"></label>
                                        <div class="col-sm-8">
                                            <button type="submit" class="btn btn-primary btn-lg">Lưu</button>
                                            <button type="button" class="btn btn-primary btn-lg" onclick="return remove_artist();" >Xóa</button>
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
            var selectImage;

            $('#choose_artist_avatar').on('change', function(){
                selectImage = 'avatar';
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

            $('#choose_artist_cover').on('change', function(){
                selectImage = 'cover';
                $('#image_demo').html('');
                $('.modal-dialog').css("max-width", "1200px")
                $('#image_demo').html('');
                $image_crop = $('#image_demo').croppie({
                    enableExif: true,
                    viewport: {
                        width:1170,
                        height:300,
                        type:'square' //circle
                    },
                    boundary:{
                        width:1170,
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
                    var top_left_x = info.points[0];
                    var top_left_y = info.points[1];
                    var bottom_right_x = info.points[2];
                    var bottom_right_y = info.points[3];
                    $('#uploadimageModal').modal('hide');
                    if(selectImage == 'avatar'){
                        $('#artist_avatar_crop_x').val('top_left:' + top_left_x + ';' + 'bottom_right:' + bottom_right_x);
                        $('#artist_avatar_crop_y').val('top_left:' + top_left_y + ';' + 'bottom_right:' + bottom_right_y);
                        $('#artist_avatar').val(response);
                        $('#artist_avatar_uploaded').attr("src", response);
                    }else{
                        $('#artist_cover_crop_x').val('top_left:' + top_left_x + ';' + 'bottom_right:' + bottom_right_x);
                        $('#artist_cover_crop_y').val('top_left:' + top_left_y + ';' + 'bottom_right:' + top_left_y);
                        $('#artist_cover').val(response);
                        $('#artist_cover_uploaded').attr("src", response);
                    }
                })
            });

        });
        function remove_artist() {
            inputs = $('form').find('input');
            $.each( inputs, function( key, value ) {
                if(value.id != "_token")
                    value.value = "";
            });
            $('form').find('.has-error').removeClass("has-error");
            $('.help-block').remove();
            $('#artist_avatar_uploaded').attr("src", '/imgs/avatar_default.png');
            $('#artist_cover_uploaded').attr("src", '/imgs/avatar_default.png');
        }
    </script>
@endsection
