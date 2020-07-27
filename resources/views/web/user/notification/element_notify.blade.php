<?php
use App\Library\Helpers;
$Data = $result->toArray()['data'];
$pagingHtml = $result->links();
?>
<?php echo ($pagingHtml ? '<ul class="list-unstyled ul_comments">' : '') ?>
<?php
if($Data) {
array_map(function ($item) {
?>
<a href="{{$item['link_url']}}" style="text-decoration: none">
<li class="media" data-status="<?php echo $item['read'] ?>" id="notify-<?php echo $item['id'] ?>" style="width: 100%; padding: 10px 5px 5px 10px;border-bottom: 1px solid #a1a1a1; <?php echo $item['read'] == 0 ? 'background: #5f5d5d24;' : '' ?>">
    <?php
    $fa_font = 'fa-flag';
    if($item['type'] == 'reply_comment' || $item['type'] == 'reply_comment'){
        $fa_font = 'fa-comment';
    }elseif($item['type'] == 'message'){
        $fa_font = 'fa-comments-o';
    }elseif($item['type'] == 'upload_success'){
        $fa_font = 'fa-check';
    }
    ?>
        <i class="fa {{$fa_font}}" style="color: red; font-size: 32px; margin-right: 10px;"></i>
    <div class="media-body">
        <div class="body_commnet">
            <div class="d-flex align-items-center justify-content-between">
                <h5 class="media-title mt-0 mb-1"><?php echo $item['text'] ?>
                </h5>
            </div>
            <i style="font-size: 12px"> <?php echo Helpers::timeElapsedString(strtotime($item['created_at'])); ?></i>
        </div>
    </div>
</li>
</a>
<?php
}, $Data);
}else{
?>
<div class="row row10px" id="playlist">
    <div class="center-text-mes"><span>Bạn chưa có thông báo nào</span>
    </div>
</div>
<?php
}
?>

<?php echo $pagingHtml ? '</ul>' : '' ?>
<center>{{($pagingHtml ?? '')}}</center>
