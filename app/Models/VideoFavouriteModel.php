<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class VideoFavouriteModel extends Model
{
    public $timestamps = false;
    protected $table = 'csn_video_favourite';
    protected $fillable = ['music_id', 'user_id'];
    public function video() {
        return $this->belongsTo('App\Models\VideoModel', 'music_id', 'music_id')->select('music_id', 'music_title_url', 'music_title', 'music_artist', 'music_artist_id', 'cat_id', 'cat_level', 'cat_sublevel', 'cover_id', 'music_download_time', 'music_last_update_time', 'music_title_url',
              'music_composer', 'music_album', 'music_listen', 'music_track_id', 'music_filename', 'music_filename', 'music_width', 'music_height', 'music_bitrate', 'music_length');
    }
}
