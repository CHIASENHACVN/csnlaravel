<?php

namespace Backpack\PermissionManager\app\Http\Controllers;

use Backpack\CRUD\app\Http\Controllers\CrudController;
// VALIDATION
use Backpack\PermissionManager\app\Http\Requests\PermissionCrudRequest as StoreRequest;
use Backpack\PermissionManager\app\Http\Requests\PermissionCrudRequest as UpdateRequest;

class PermissionCrudController extends CrudController
{
    public function setup()
    {
        $role_model = config('laravel-permission.models.role');
        $permission_model = config('laravel-permission.models.permission');
        $this->crud->setModel($permission_model);
        $this->crud->setEntityNameStrings(trans('backpack::permissionmanager.permission_singular'), trans('backpack::permissionmanager.permission_plural'));
        $this->crud->setRoute(config('backpack.base.route_prefix').'/permission');
        $this->crud->orderBy('id', 'desc');
        if(!backpack_user()->can('role_permission_(list)')) {
            $this->crud->denyAccess(['list']);
        }
        if(!backpack_user()->can('role_permission_(create)')) {
            $this->crud->denyAccess(['create']);
        }
        if(!backpack_user()->can('role_permission_(update)')) {
            $this->crud->denyAccess(['update']);
        }
        if(!backpack_user()->can('role_permission_(delete)')) {
            $this->crud->denyAccess(['delete']);
        }
        $this->crud->addColumn([
            'name'  => 'display_name',
            'label' => 'Tên hiển thị',
            'type'  => 'text',
        ]);
        $this->crud->addColumn([
            'name'  => 'name',
            'label' => trans('backpack::permissionmanager.name'),
            'type'  => 'text',
        ]);
        $this->crud->addColumn([ // n-n relationship (with pivot table)
            'label'     => trans('backpack::permissionmanager.roles_have_permission'),
            'type'      => 'select_multiple',
            'name'      => 'roles',
            'entity'    => 'roles',
            'attribute' => 'name',
            'model'     => $role_model,
            'pivot'     => true,
        ]);
        $this->crud->addField([
            'name'  => 'display_name',
            'label' => 'Tên hiển thị',
            'type'  => 'text',
        ]);
        $this->crud->addField([
            'name'  => 'name',
            'label' => trans('backpack::permissionmanager.name'),
            'type'  => 'text',
        ]);
        $this->crud->addField([
            'name'  => 'description',
            'label' => 'Mỗ tả',
            'type'  => 'textarea',
        ]);
        $this->crud->addField([
            'label'     => trans('backpack::permissionmanager.roles'),
            'type'      => 'checklist',
            'name'      => 'roles',
            'entity'    => 'roles',
            'attribute' => 'name',
            'model'     => $role_model,
            'pivot'     => true,
        ]);
        if (!config('backpack.permissionmanager.allow_permission_create')) {
            $this->crud->denyAccess('create');
        }
        if (!config('backpack.permissionmanager.allow_permission_update')) {
            $this->crud->denyAccess('update');
        }
        if (!config('backpack.permissionmanager.allow_permission_delete')) {
            $this->crud->denyAccess('delete');
        }
    }

    public function store(StoreRequest $request)
    {
        return parent::storeCrud();
    }

    public function update(UpdateRequest $request)
    {
        return parent::updateCrud();
    }
}
