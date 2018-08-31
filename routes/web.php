<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('/logout', 'UserController@logout');

Route::get('/', ['as' => 'HomeController.index', 'uses' => 'HomeController@index']);
Route::get('/home', ['as' => 'HomeController.index', 'uses' => 'HomeController@index']);
Route::get('/upload', ['as' => 'upload.index', 'uses' => 'UploadController@index']);

// Socialite
Route::get('auth/facebook', 'Auth\AuthFacebookController@redirectToProvider');
Route::get('auth/facebook/callback', 'Auth\AuthFacebookController@handleProviderCallback');

// listen music
Route::get('mp3/{cat}/{sub}/{musicUrl}.html', ['as' => 'music.listen', 'uses' => 'MusicController@listenMusic']);
Route::get('mp3/{cat}/{sub}/{musicUrl}', ['as' => 'music.listen', 'uses' => 'MusicController@listenMusic']);
Route::get('embed/mp3/{music}', 'MusicController@embed');


// ajax comment
Route::post('comment/get_ajax', ['as' => 'comment.get_ajax', 'uses' => 'CommentController@getAjaxCommentByMusicId']);


Auth::routes();


Route::group(['middleware' => ['auth']], function() {

    // upload selector
    Route::get('upload/artist', ['as' => 'upload.createArtist', 'uses' => 'UploadController@createArtist']);
    Route::post('upload/artist', ['as' => 'upload.storeArtist', 'uses' => 'UploadController@storeArtist']);
    Route::get('upload/music', ['as' => 'upload.createMusic', 'uses' => 'UploadController@createMusic']);
    Route::post('upload/music', ['as' => 'upload.storeMusic', 'uses' => 'UploadController@storeMusic']);
    Route::post('upload/file_music', ['as' => 'upload.fileMusic', 'uses' => 'UploadController@uploadFileMusic']);
    Route::get('artist/search', ['as' => 'artist.gettermartist', 'uses' => 'ArtistController@getTermArtist']);

    // Comment
    Route::post('comment/post', ['as' => 'comment.create', 'uses' => 'CommentController@postComment']);



    Route::get('roles',['as'=>'roles.index','uses'=>'RoleController@index']);
    Route::get('roles/create',['as'=>'roles.create','uses'=>'RoleController@create']);


    Route::post('roles/create',['as'=>'roles.store','uses'=>'RoleController@store']);
    Route::get('roles/{id}',['as'=>'roles.show','uses'=>'RoleController@show']);
    Route::get('roles/{id}/edit',['as'=>'roles.edit','uses'=>'RoleController@edit']);
    Route::patch('roles/{id}',['as'=>'roles.update','uses'=>'RoleController@update']);
    Route::delete('roles/{id}',['as'=>'roles.destroy','uses'=>'RoleController@destroy']);


    Route::get('itemCRUD2',['as'=>'itemCRUD2.index','uses'=>'ItemCRUD2Controller@index','middleware' => ['permission:item-list|item-create|item-edit|item-delete']]);
    Route::get('itemCRUD2/create',['as'=>'itemCRUD2.create','uses'=>'ItemCRUD2Controller@create','middleware' => ['permission:item-create']]);
    Route::post('itemCRUD2/create',['as'=>'itemCRUD2.store','uses'=>'ItemCRUD2Controller@store','middleware' => ['permission:item-create']]);
    Route::get('itemCRUD2/{id}',['as'=>'itemCRUD2.show','uses'=>'ItemCRUD2Controller@show']);
    Route::get('itemCRUD2/{id}/edit',['as'=>'itemCRUD2.edit','uses'=>'ItemCRUD2Controller@edit','middleware' => ['permission:item-edit']]);
    Route::patch('itemCRUD2/{id}',['as'=>'itemCRUD2.update','uses'=>'ItemCRUD2Controller@update','middleware' => ['permission:item-edit']]);
    Route::delete('itemCRUD2/{id}',['as'=>'itemCRUD2.destroy','uses'=>'ItemCRUD2Controller@destroy','middleware' => ['permission:item-delete']]);


});
