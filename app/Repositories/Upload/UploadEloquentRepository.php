<?php
namespace App\Repositories\Upload;

use App\Repositories\EloquentRepository;
use DB;
class UploadEloquentRepository extends EloquentRepository implements UploadRepositoryInterface
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\UploadModel::class;
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
            ->where('music_id', $id)
            ->first();

        return $result;
    }
    public function findMusicStatus($userId, $id, $stageArr)
    {
        $result = $this
            ->_model
            ->where('music_id', $id)
            ->where('music_user_id', $userId)
            ->whereIn('music_state', $stageArr)
            ->first();

        return $result;
    }
    /**
     * Create
     * @return mixed
     */
    public function create(array $attributes)
    {
        $attributes['music_last_update_time'] = strtotime(date('Y/m/d H:i:s'));
        $result = $this->_model::firstOrCreate($attributes);
        return $result;
    }
    public function musicByUser($userId, $stageArr, $fillOrder, $typeOrder, $page)
    {
        $result = $this->_model::select('music_id', 'cat_id', 'cat_level', 'album_id', 'music_title', 'music_artist', 'music_artist_id', 'music_album_id', 'music_bitrate', 'music_filename', 'music_updated', 'music_last_update_time')
            ->where('music_user_id', $userId)
            ->whereIn('music_state', $stageArr)
            ->orderBy($fillOrder, $typeOrder)
            ->paginate($page);
        return $result;
    }
}

