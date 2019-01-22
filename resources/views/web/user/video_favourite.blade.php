<div class="row row10px float-col-width-video">
    <?php
    use App\Library\Helpers;
    $data = $videoFavourite->toArray()['data'];
    $idAuth = Auth::check() ? Auth::user()->id : 0;
    ?>
    @if($data)
    <?php
    array_map(function ($item) use($idAuth) {
    $item = $item['video'];
    $url = Helpers::listen_url($item);
    $userFav = $item['user_id'];
    ?>
    <div class="col">
        <div class="card card1 video">
            <div class="card-header" style="background-image: url({{Helpers::thumbnail_url($item)}});">
                <a href="javascript:void(0)" onclick="return favourite('{{str_replace("'", "\'", $item['music_title'])}}', 'music', '{{$item['music_id']}}')" class="btn-video-favourite wishlist wishlist-{{$item['music_id']}} toggle_wishlist {{$userFav == $idAuth ? 'selector' : ''}} px-1"><i aria-hidden="true" class="fa fa-heart-o"></i></a>
                <a href="{{$url}}" title="{{$item['music_title']}}">
                    <span class="icon-play"></span>
                </a>
            </div>
            <div class="card-body">
                <h3 class="card-title"><a href="{{$url}}" title="{{$item['music_title']}}">{{$item['music_title']}}</a></h3>
                <p class="card-text" style="padding: 0px;"><?php echo Helpers::rawHtmlArtists($item['music_artist_id'], $item['music_artist']) ?></p>
            </div>
        </div>
    </div>
    <?php
    }, $data)
    ?>
    <center>{{$videoFavourite->links()}}</center>
    @else
        <div class="center-text-mes"><span>Chưa có video nào</span></div>
    @endif
</div>