<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class PlaylistMusicModel extends Model
{
    public $timestamps = false;
    protected $table = 'csn_playlist_music';
    protected $fillable = ['playlist_id', 'music_id', 'playlist_order'];

    public function music()
    {
        return $this->belongsTo('App\Models\MusicModel', 'music_id')->select('music_id', 'music_title_url', 'music_title', 'music_artist', 'cat_id', 'cat_level', 'cat_sublevel', 'cat_custom', 'cover_id', 'music_download_time', 'music_last_update_time', 'music_title_url',
            'music_title_search', 'music_artist_search', 'music_album_search', 'music_composer', 'music_album', 'music_listen');
    }

}
