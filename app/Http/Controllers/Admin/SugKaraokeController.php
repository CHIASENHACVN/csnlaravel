<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/17/2018
 * Time: 3:38 PM
 */
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request as Request;
use App\Library\Helpers;
use App\Http\Requests;
use Illuminate\Support\Facades\Storage;
use Backpack\CRUD\app\Http\Controllers\CrudController;
// VALIDATION: change the requests to match your own file names if you need form validation
use Backpack\CRUD\app\Http\Requests\CrudRequest as StoreRequest;
use Backpack\CRUD\app\Http\Requests\CrudRequest as UpdateRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Artist\ArtistRepository;
use App\Solr\Solarium;
use App\Http\Controllers\Sync\SolrSyncController;
use App\Models\KaraokeSuggestionModel;
use App\Models\MusicKaraokeModel;
use App\Models\MusicModel;

class SugKaraokeController extends CrudController
{
    protected $Solr;

    public function __construct(Solarium $Solr)
    {
        parent::__construct();
        $this->middleware(function ($request, $next)
        {
            if(!backpack_user()->can('suggestion_karaoke_(list)')) {
                $this->crud->denyAccess(['list']);
            }
            if(!backpack_user()->can('suggestion_karaoke_(create)')) {
                $this->crud->denyAccess(['create']);
            }
            if(!backpack_user()->can('suggestion_karaoke_(update)')) {
                $this->crud->denyAccess(['update']);
            }
            if(!backpack_user()->can('suggestion_karaoke_(delete)')) {
                $this->crud->denyAccess(['delete']);
            }
            return $next($request);
        });
        $this->Solr = $Solr;
    }
    public function setup()
    {
        $this->crud->setModel("App\Models\KaraokeSuggestionModel");
        $this->crud->setEntityNameStrings('Karaoke', 'Karaoke');
        $this->crud->setRoute(config('backpack.base.route_prefix').'/karaoke');
        $this->crud->orderBy('status', 'asc');
        $this->crud->orderBy('id', 'asc');
        $this->crud->denyAccess(['create']);
        $this->crud->addFilter([ // dropdown filter
            'name' => 'status',
            'type' => 'dropdown',
            'label'=> 'Tình trạng'
        ], [
            0 => 'Chưa xem',
            1 => 'Chưa phù hợp',
            2 => 'Đã xác nhận',
            3 => 'Bài hát bị xóa',
        ], function($value) { // if the filter is active
            $this->crud->addClause('where', 'status', $value);
        });
//        $this->crud->setEntityNameStrings('menu item', 'menu items');


        $this->crud->setColumns([
            [
                'name'  => 'music_id',
                'label' => 'Music ID',
                'type' => 'closure',
                'function' => function($entry) {
                    return '<a href="/user/music_uploaded/redirect/'.$entry->music_id.'" target="_blank">'.$entry->music_id.'</a>';
                },
            ],
            [
                'name'  => 'music_time',
                'label' => 'Ngày tạo',
                'type' => 'date',
            ],
            [
                'name'  => 'music_title',
                'label' => 'Tên bài hát',
            ],
            [
                'label' => 'Người tạo',
                'type' => 'select',
                'name' => 'user_id',
                'entity' => 'user',
                'attribute' => 'name',
                'model' => "App\User",
            ],
            [
                'name'  => 'status',
                'label' => 'Tình Trạng',
                'type' => 'closure',
                'function' => function($entry) {
                    if($entry->status == 0) {
                        return '<span class="label label-warning">Chưa xem</span>';
                    }elseif($entry->status == 1) {
                        return '<span class="label label-default">Chưa phù hợp</span>';
                    }elseif($entry->status == 2){
                        return '<span class="label label-default">Đã xác nhận</span>';
                    }elseif($entry->status == 3){
                        return '<span class="label label-default">Bài hát bị xóa</span>';
                    }
                },
            ]
        ]);


        $this->crud->addField([
            'name'  => 'id',
            'type'  => 'hidden',
        ]);
        $this->crud->addField([
            'name'  => 'music_id',
            'type'  => 'hidden',
        ]);
        $this->crud->addField([
            'name'  => 'music_title',
            'type'  => 'hidden',
        ]);
        $this->crud->addField([
            'name'  => 'music_artist',
            'type'  => 'hidden',
        ]);
        $this->crud->addField([
            'name'  => 'music_lyric_karaoke',
            'type'  => 'hidden',
        ]);
        $this->crud->addField([
            'name'  => 'user_id',
            'type'  => 'hidden',
        ]);
        $this->crud->addField([
            'label' => 'Tình trạng',
            'type' => 'select_from_array',
            'name' => 'status',
            'options' => [0 => 'Chưa xem', 1 => 'Chưa phù hợp'],
            'allows_null' => false,
            'default' => 0,
        ]);
    }

    public function edit($id, $template = false)
    {
        $this->crud->hasAccessOrFail('update');

        // get entry ID from Request (makes sure its the last ID for nested resources)
        $id = $this->crud->getCurrentEntryId() ?? $id;

        // get the info for that entry
        $this->data['entry'] = $this->crud->getEntry($id);
        $this->data['crud'] = $this->crud;
        $this->data['saveAction'] = $this->getSaveAction();
        $this->data['fields'] = $this->crud->getUpdateFields($id);
        $this->data['title'] = trans('backpack::crud.edit').' '.$this->crud->entity_name;
        $this->data['id'] = $id;
        $music = MusicModel::find($this->data['fields']['music_id']['value']);
        if(!$music) {
            \Alert::error('Lỗi, bài hát đã bị xóa')->flash();
            $sugKara = KaraokeSuggestionModel::find($id);
            $sugKara->status = 3;
            $sugKara->save();
            return redirect()->back();
        }
        $this->data['music'] = $music;
        return view('vendor.backpack.karaoke.edit', $this->data);
    }
    public function destroy($id)
    {
        return $this->crud->delete($id);
    }
    public function store(StoreRequest $request)
    {
        return parent::storeCrud($request);
    }
    public function update(UpdateRequest $request)
    {
        return parent::updateCrud($request);
    }
    public function approvalKaraoke(StoreRequest $request, $id) {
        $sugKara = KaraokeSuggestionModel::find($id);
        if(!$sugKara) {
            \Alert::error('Lỗi, gợi ý không tồn tại')->flash();
            return redirect()->back();
        }
        $music = MusicModel::where('music_id', $request->music_id)->first();
        if(!$music->musicKara) {
            MusicKaraokeModel::create([
                'music_id' => $music->music_id,
                'music_title' => $music->music_title,
                'music_artist' => $music->music_artist,
                'music_downloads_this_week' => $music->music_downloads_this_week,
                'music_time' => time(),
                'music_update_time' => time(),
                'user_id' => $sugKara->user_id,
                'music_length' => $music->music_length,
                'music_lyric_karaoke' => $request->music_lyric_karaoke,
            ]);
        }else{
            $music->musicKara->music_lyric_karaoke = $request->music_lyric_karaoke;
            $music->musicKara->user_id = $sugKara->user_id;
            $music->musicKara->music_update_time = time();
            $music->musicKara->save();
            $music->music_last_update_time = time();
            $music->save();
        }
        $sugKara->status = 2;
        $sugKara->approval_by = Auth::user()->id;
        $sugKara->save();
        \Alert::success('Cập nhật karaoke mới thành công.')->flash();
        return \Redirect::to($this->crud->route);
    }
}