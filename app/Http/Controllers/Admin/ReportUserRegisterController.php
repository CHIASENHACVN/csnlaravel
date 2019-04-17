<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/17/2018
 * Time: 3:38 PM
 */
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request as Request;

use App\Http\Requests;
use App\Library\Helpers;
use Backpack\CRUD\app\Http\Controllers\CrudController;
// VALIDATION: change the requests to match your own file names if you need form validation
use Backpack\CRUD\app\Http\Requests\CrudRequest as StoreRequest;
use Backpack\CRUD\app\Http\Requests\CrudRequest as UpdateRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\SearchResult\SearchResultEloquentRepository;
use App\Repositories\Music\MusicEloquentRepository;
use App\Repositories\User\UserEloquentRepository;
use App\Models\UserLogModel;
use DB;

class ReportUserRegisterController extends CrudController
{

    public function __construct()
    {
        $this->middleware(function ($request, $next)
        {
            if(!backpack_user()->can('report_user_register_(list)')) {
                $this->crud->denyAccess(['list']);
            }
            return $next($request);
        });

        parent::__construct();

    }

    public function index()
    {
        $this->crud->hasAccessOrFail('list');
        $this->crud->setOperation('list');

        $this->data['crud'] = $this->crud;
        $this->data['title'] = $this->crud->getTitle() ?? mb_ucfirst($this->crud->entity_name_plural);

        $chart = UserLogModel::select(DB::raw('DATE_FORMAT(FROM_UNIXTIME(log_date), \'%d-%m\') as date'), DB::raw('count(*) as views'))
        ->where('log_date', '>=', strtotime(TIME_60DAY_AGO))
        ->groupBy('date')
        ->get()
        ->toArray();
        $this->data['chart'] = $chart;
        // load the view from /resources/views/vendor/backpack/crud/ if it exists, otherwise load the one in the package
        return view('vendor.backpack.report.list_user_register', $this->data);
    }

    public function setup()
    {
//        parent::__construct();
        $this->crud->setModel("App\Models\UserModel");
        $this->crud->setEntityNameStrings('Kết quả tìm kiếm', 'User đăng ký');
        $this->crud->setRoute(config('backpack.base.route_prefix').'/report_user_register');
//        $this->crud->setEntityNameStrings('menu item', 'menu items');


        $this->crud->denyAccess(['create', 'update', 'reorder', 'delete']);
        $this->crud->enableBulkActions();
        $this->crud->addBulkDeleteButton();
        $this->crud->removeAllButtons();

        $this->crud->orderBy('user_regdate', 'desc');

        $this->crud->addFilter([ // daterange filter
            'type' => 'date_range',
            'name' => 'from_to',
            'label'=> 'Thời gian đăng ký'
        ],
            false,
            function($value) {
                $dates = json_decode(htmlspecialchars_decode($value, ENT_QUOTES));
                $this->crud->addClause('whereDate', 'user_regdate', '>=', strtotime($dates->from . ' 00:00'));
                $this->crud->addClause('whereDate', 'user_regdate', '<=', strtotime($dates->to . ' 23:59'));
            });
        $this->crud->addFilter([ // dropdown filter
            'name' => 'type',
            'type' => 'dropdown',
            'label'=> 'Thể loại đăng ký'
        ], [
            1 => 'Facebook',
            2 => 'Google',
            3 => 'Tài khoản CSN',
        ], function($value) { // if the filter is active
            if ($value == 0) {

            } elseif ($value == 1) {
                $this->crud->addClause('where', 'user_fb_identity', '!=', '');

            } elseif ($value == 2) {
                $this->crud->addClause('where', 'user_identity', '!=', '');

            } else {
                $this->crud->addClause('where', 'user_fb_identity', '!=', '');
                $this->crud->addClause('where', 'user_identity', '!=', '');
            }
        });

        $this->crud->addColumn([
            'name'  => 'id',
            'label' => 'User',
            'type' => 'closure',
            'function' => function($entry) {
                return '<a href="/user/'.$entry->id.'" target="_blank">'.$entry->name.'</a>';
            },
        ]);
        $this->crud->addColumn([
            'name' => 'created_at',
            'label' => 'Đăng ký',
            'type' => "datetime",
            'format' => 'Y-m-d H:i'
        ]);

        $this->crud->addColumn([
            'name' => 'username',
            'label' => 'User name',
        ]);

        $this->crud->addColumn([
            'name' => 'Tên người dùng',
            'label' => 'name',
        ]);

        $this->crud->addColumn([
            'name' => 'email',
            'label' => 'Email',
        ]);
//        $this->crud->addButtonFromView('line', 'view', 'show', 'end');
    }
    public function store(StoreRequest $request)
    {
        return parent::storeCrud();
    }
    public function destroy($id)
    {
        $this->crud->hasAccessOrFail('delete');

        // get entry ID from Request (makes sure its the last ID for nested resources)
        $id = $this->crud->getCurrentEntryId() ?? $id;
        return $this->crud->delete($id);
    }
    public function update(UpdateRequest $request)
    {
        return parent::updateCrud();
    }
}