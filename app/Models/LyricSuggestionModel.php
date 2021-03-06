<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Backpack\CRUD\CrudTrait;
use DB;

class LyricSuggestionModel extends Model
{
    use CrudTrait;
    public $timestamps = false;
    protected $table = 'csn_music_lyric_suggestion';
    protected $primaryKey = 'id';
    protected $fillable = ['music_id', 'music_title', 'music_artist', 'music_time', 'music_length', 'music_lyric', 'user_id', 'status', 'approval_by'];
    public function user()
    {
        return $this->belongsTo('App\Models\UserModel', 'user_id')->select('id', 'name', 'user_avatar', 'username');
    }
}
