<?php
namespace App\Repositories\Cover;

use App\Repositories\EloquentRepository;
use DB;
class CoverEloquentRepository extends EloquentRepository implements CoverRepositoryInterface
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\CoverModel::class;
    }
    /**
     * Get all posts only published
     * @return mixed
     */
    public function getAllPublished()
    {
        $result = $this->_model->where('is_published', 1)->get();

        return $result;
    }

    /**
     * Get post only published
     * @param $id int Post ID
     * @return mixed
     */
    public function findOnlyPublished($id)
    {
        $result = $this
            ->_model
            ->where('id', $id)
            ->where('is_published', 1)
            ->first();

        return $result;
    }

    /**
     * Create
     * @return mixed
     */
    public function getCoverHot()
    {
        $result = $this->_model::with('music')->orderBy('cover_id', 'desc')->limit(20)->get();
        return $result;
    }

}

