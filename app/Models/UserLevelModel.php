<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Backpack\CRUD\CrudTrait;
use DB;

class UserLevelModel extends Model
{
    use CrudTrait;
    protected $table = 'csn_users_level';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'level_id', 'level_expried', 'level_note', 'level_block'];

    public function level() {
        return $this->belongsTo('App\Models\LevelModel', 'level_id');
    }
    public function user()
    {
        return $this->belongsTo('App\Models\UserModel', 'user_id')->select('id', 'name', 'user_avatar', 'username');
    }
}
