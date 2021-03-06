<?php

namespace App;

use Backpack\Base\app\Notifications\ResetPasswordNotification as ResetPasswordNotification;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Backpack\CRUD\CrudTrait;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable;
    use CrudTrait;
    use HasRoles;

    protected $table = 'csn_users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_active', 'username', 'user_id', 'password', 'user_identity', 'name', 'user_level', 'user_session_time', 'user_session_page', 'user_lastvisit',
        'user_regdate', 'user_music', 'user_comments', 'user_money', 'user_money_upload', 'user_money_download', 'user_login_tries', 'user_last_login_try', 'user_allow_viewonline', 'user_avatar',
        'email', 'user_phone_number', 'user_interests', 'user_actkey', 'user_birthday', 'user_gender', 'user_favourite', 'remember_token', 'user_fb_identity', 'user_music_recent', 'user_identity_card',
        'vip_level', 'vip_time_exprited', 'user_cover', 'user_music_search_recent'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Send the password reset notification.
     *
     * @param string $token
     *
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
    public function roleUser()
    {
        return $this->belongsTo('App\Models\RoleUser', 'user_id');
    }
    public function role() {
        return $this->belongsToMany(
            config('laravel-permission.models.role'),
            config('laravel-permission.table_names.user_has_roles')
        );
    }
    public function permissionsExtra()
    {
        return $this->belongsToMany(
            config('laravel-permission.models.permission'),
            config('laravel-permission.table_names.user_has_permissions')
        );
    }

    public function rolesCSNRoleName()
    {
        $relationship = $this->belongsToMany(Config::get('entrust.role'), Config::get('entrust.role_user_table'), Config::get('entrust.user_foreign_key'), Config::get('entrust.role_foreign_key'))->first();
        if(!$relationship)
            return DEFAULT_ROLE_NAME_EMPTY;
        return $relationship->name;
    }
    public function level() {
        return $this->belongsTo('App\Models\UserLevelModel', 'id', 'user_id')->first();
    }
    public function levelInfo() {
        return $this->belongsToMany('App\Models\LevelModel', 'csn_users_level', 'user_id', 'level_id');
    }
    public function notifyCount()
    {
        return $this->belongsTo('App\Models\NotificationModel', 'id', 'user_id')->where('read', 0)->count();
    }
    public function notifyList()
    {
        return $this->belongsTo('App\Models\NotificationModel', 'id', 'user_id')->where('read', 0)->orderBy('id', 'desc')->limit(20)->get();
    }
}
