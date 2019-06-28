<?php

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.

Route::group([
    'prefix'     => config('backpack.base.route_prefix', 'admin'),
    'middleware' => ['web', config('backpack.base.middleware_key', 'admin')],
    'namespace'  => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    CRUD::resource('category_csn', 'CategoryCsnController');
    CRUD::resource('category_playlist', 'CategoryPlaylistController');
    CRUD::resource('playlist_user', 'PlaylistUserController');
    CRUD::resource('playlist_publisher', 'PlaylistPublisherController');
    CRUD::resource('music', 'MusicController');
    CRUD::resource('video', 'VideoController');
    CRUD::resource('report_user_login', 'ReportUserLoginController');
    CRUD::resource('report_user_register', 'ReportUserRegisterController');

    CRUD::resource('lyric', 'SugLyricController');
    CRUD::resource('karaoke', 'SugKaraokeController');
    CRUD::resource('list_music_lyric_karaoke', 'LyricKaraokeMusicController');
    CRUD::resource('list_video_lyric_karaoke', 'LyricKaraokeVideoController');
    CRUD::resource('upload', 'UploadController');
    Route::get('upload/set_exp/{id}', 'UploadController@setExp');
    CRUD::resource('upload_blocked', 'UploadBlockedController');


    CRUD::resource('comment', 'CommentController');
    CRUD::resource('comment_replay', 'CommentReplayController');
    Route::get('playlist_user/{id}/approval', 'PlaylistUserController@approvalPublisher');

    CRUD::resource('artist_upload', 'ArtistUploadController');
    CRUD::resource('artist', 'ArtistController');
    CRUD::resource('search_results', 'SearchResultController');
    CRUD::resource('artist_exception', 'ExceptionArtistController');

    Route::get('block_artist/{id}', 'ExceptionArtistController@setExptionArtist');
    Route::get('rm_block_artist/{id}', 'ExceptionArtistController@RemoveExptionArtist');

    Route::get('artist_upload/preview/{id}', 'ArtistUploadController@preview');
    Route::get('artist_upload/suggest/{id}', 'ArtistUploadController@suggest');
    CRUD::resource('comment_replay', 'CommentReplayController');

    Route::put('/artist_upload/suggest/{id}', 'ArtistUploadController@suggest');
    Route::put('/artist_upload/approval/{id}', 'ArtistUploadController@approvalArtistUpload');

    Route::put('/lyric/suggest/{id}', 'SugLyricController@approvalLyric');
    Route::put('/karaoke/suggest/{id}', 'SugKaraokeController@approvalKaraoke');

});
Route::group([
    'namespace'  => 'Backpack\PermissionManager\app\Http\Controllers',
    'prefix'     => config('backpack.base.route_prefix', 'admin'),
    'middleware' => ['web', backpack_middleware()],
], function () {
    Route::get('/ajax-role-options', 'UserCrudController@getRoleOption');

});


