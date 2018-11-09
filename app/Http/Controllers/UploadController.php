<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/9/2018
 * Time: 11:35 AM
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request as Request;
use Illuminate\Support\Facades\Auth;
use App\Library\Helpers;
use App\Repositories\ArtistUpload\ArtistUploadEloquentRepository;
use App\Repositories\Music\MusicEloquentRepository;
use App\Repositories\Upload\UploadEloquentRepository;
use App\Repositories\Album\AlbumEloquentRepository;
use File;

class UploadController extends Controller
{
    protected $artistUploadRepository;
    protected $musicRepository;
    protected $uploadRepository;
    protected $albumRepository;

    public function __construct(ArtistUploadEloquentRepository $artistUploadRepository, MusicEloquentRepository $musicRepository,
                                UploadEloquentRepository $uploadRepository, AlbumEloquentRepository $albumRepository) {
        $this->artistUploadRepository = $artistUploadRepository;
        $this->musicRepository = $musicRepository;
        $this->uploadRepository = $uploadRepository;
        $this->albumRepository = $albumRepository;
    }
    public function index() {
        return view('upload.index');
    }
    public function createArtist(Request $request) {
        return view('upload.upload_artist');
    }
    public function createMusic(Request $request) {
        $typeUpload = 'music';
        return view('upload.upload_music', compact('typeUpload'));
    }
    public function createVideo(Request $request) {
        $typeUpload = 'video';
        return view('upload.upload_music', compact('typeUpload'));
    }
    public function createAlbum(Request $request) {
        return view('upload.upload_album');
    }
    function storeArtist(Request $request) {
        $this->validate($request, [
            'artist_nickname' => 'required|max:255',
            'artist_birthday' => 'required|max:15|date',
            'artist_gender' => 'required|max:1',
            'artist_avatar' => 'required',
            'choose_artist_avatar' => 'required|mimes:jpeg,bmp,png,gif|max:10000kb|file:1',
            'artist_cover' => 'required',
            'choose_artist_cover' => 'required|mimes:jpeg,bmp,png,gif|max:10000kb|file:1',
            'artist_avatar_crop_x' => 'required',
            'artist_avatar_crop_y' => 'required',
            'artist_cover_crop_x' => 'required',
            'artist_cover_crop_y' => 'required'
        ]);
        $artist = [
            'artist_nickname' => $request->input('artist_nickname'),
            'artist_birthday' => date("Y/m/d", strtotime($request->input('artist_birthday'))),
            'artist_gender' => $request->input('artist_gender'),
            'last_update_user_id' => Auth::user()->id,
            'artist_avatar_crop_x' => $request->input('artist_avatar_crop_x'),
            'artist_avatar_crop_y' => $request->input('artist_avatar_crop_y'),
            'artist_cover_crop_x' => $request->input('artist_cover_crop_x'),
            'artist_cover_crop_y' => $request->input('artist_cover_crop_y')
        ];
        if(!$artist)
            return redirect()->route('upload.createArtist')->with('error', 'tạo ca sĩ thất bại');
        $result = $this->artistUploadRepository->create($artist);
        //save image
        $typeImageAvatar = array_last(explode('.', $_FILES['choose_artist_avatar']['name']));
        $typeImageCover = array_last(explode('.', $_FILES['choose_artist_cover']['name']));
//        dd($request->input('artist_avatar'));
        $fileNameAvt = Helpers::saveBase64Image($request->input('artist_avatar'), Helpers::file_path($result->artist_id, AVATAR_ARTIST_CROP_PATH, true), $result->artist_id, $typeImageAvatar);
        Helpers::copySourceImage($request->file('choose_artist_avatar'), Helpers::file_path($result->artist_id, AVATAR_ARTIST_SOURCE_PATH, true), $result->artist_id, $typeImageAvatar);
        $fileNameCover = Helpers::saveBase64Image($request->input('artist_cover'), Helpers::file_path($result->artist_id, COVER_ARTIST_CROP_PATH, true), $result->artist_id, $typeImageCover);
        Helpers::copySourceImage($request->file('choose_artist_cover'), Helpers::file_path($result->artist_id, COVER_ARTIST_SOURCE_PATH, true), $result->artist_id, $typeImageCover);
        $result->artist_avatar = $fileNameAvt;
        $result->artist_cover = $fileNameCover;
        $result->save();
        return redirect()->route('upload.createArtist')->with('success', 'Đã tạo ca sĩ ' . $result->artist_nickname);
    }
    function uploadFileMusic(Request $request) {
        $fileName = Helpers::moveFile($request->file('file'), DEFAULT_ROOT_TEMP_MUSIC_PATH, $_FILES['file']['name']);
//        echo $fileName;
        return response()->json([
            'status' => true,
            'message' => 'Upload Success',
            'file_name' => $fileName,
        ]);
    }
    public function storeMusic(Request $request) {
        $this->validate($request, [
            'music_title' => 'required',
            'music_composer' => 'required',
            'music_artist' => 'required',
            'drop_files' => 'required',
            'music_year' => 'required',
        ]);
        $typeUpload = $request->input('type_upload');
        $mess = $typeUpload == 'music' ? 'bài hát' : 'video';
        $csnMusic = [
            'music_title' => $request->input('music_title'),
            'music_artist' => $request->input('music_artist'),
            'music_artist_id' => $request->input('music_artist_id'),
            'music_user_id' => Auth::user()->id,
            'music_username' => Auth::user()->name,
            'music_production' => $request->input('music_production') ?? '',
            'music_composer' => $request->input('music_composer') ?? '',
            'music_album_id' => $request->input('music_album_id') ?? ' ',
            'music_year' => $request->input('music_year') ?? 0,
            'cat_id' => $request->input('cat_id') ?? 0,
            'cat_level' => $request->input('cat_level') ?? 0,
            'cat_sublevel' => $request->input('cat_sublevel') ?? 0,
            'cat_custom' => $request->input('cat_custom') ?? 0,
            'music_lyric' => $request->input('music_lyric') ?? '',
            'music_note' => $request->input('music_note') ?? '',
            'music_source_url' => $request->input('music_source_url') ?? '',
            'music_filename_upload' => $request->input('drop_files'),
        ];
        $result = $this->uploadRepository->create($csnMusic);

        if(!$result)
            return redirect()->route('upload.createMusic')->with('error', 'tạo '.$mess.' thất bại');
        File::move(DEFAULT_ROOT_TEMP_MUSIC_PATH.'/'.$request->input('drop_files'), DEFAULT_ROOT_CACHE_MUSIC_PATH.'/'.$request->input('drop_files'));
        return redirect()->route('upload.createMusic')->with('success', 'Đã tạo '.$mess.' ' . $csnMusic['music_title']);
    }

    public function storeAlbum(Request $request) {
        $this->validate($request, [
            'music_album' => 'required',
            'music_composer' => 'required',
            'music_artist' => 'required',
            'drop_files' => 'required',
            'album_cover' => 'required',
            'music_year' => 'required',
        ]);
        $fileUploads = explode(';', $request->input('drop_files'));
        $album = $this->albumRepository->create([
            'album_name' => $request->input('music_album'),
            'album_production' => $request->input('music_production'),
            'album_code' => $request->input('music_album_id'),
            'album_year' => $request->input('music_year'),
            'cover_filename' => '',
            'album_music_total' => count($fileUploads),
            'user_id' => Auth::user()->id,
        ]);
        if(!$album)
            return redirect()->route('upload.upload_album')->with('error', 'tạo album thất bại');
        $typeImageCover = array_last(explode('.', $_FILES['choose_album_cover']['name']));
        $fileNameCovert = Helpers::saveBase64Image($request->input('album_cover'), Helpers::file_path($album->album_id, AVATAR_ALBUM_CROP_PATH, true), $album->album_id, $typeImageCover);
        Helpers::copySourceImage($request->file('choose_album_cover'), Helpers::file_path($album->album_id, COVER_ALBUM_SOURCE_PATH, true), $album->artist_id, $fileNameCovert);
        $album->cover_filename = $fileNameCovert;
        $album->save();
        $csnMusic = [
            'music_title' => '',
            'album_id' => $album->album_id,
            'music_album' => $album->album_name,
            'music_artist' => $request->input('music_artist'),
            'music_artist_id' => $request->input('music_artist_id'),
            'music_user_id' => Auth::user()->id,
            'music_username' => Auth::user()->name,
            'music_production' => $request->input('music_production') ?? '',
            'music_composer' => $request->input('music_composer') ?? '',
            'music_album_id' => $request->input('music_album_id'),
            'music_year' => $request->input('music_year') ?? 0,
            'cat_id' => $request->input('cat_id') ?? 0,
            'cat_level' => $request->input('cat_level') ?? 0,
            'cat_sublevel' => $request->input('cat_sublevel') ?? 0,
            'cat_custom' => $request->input('cat_custom') ?? 0,
            'music_lyric' => '',
            'music_note' => $request->input('music_note') ?? '',
            'music_source_url' => $request->input('music_source_url') ?? '',
        ];
        foreach ($fileUploads as $item) {
            $csnMusic['music_filename_upload'] = $item;
            $this->uploadRepository->create($csnMusic);
            File::move(DEFAULT_ROOT_TEMP_MUSIC_PATH.'/'.$item, DEFAULT_ROOT_CACHE_MUSIC_PATH.'/'.$item);
        }
        return redirect()->route('upload.createMusic')->with('success', 'Đã tạo album mới' . $request->input('music_album'));
    }

}