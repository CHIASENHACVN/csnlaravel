<?php
namespace App\Repositories\MessageUser;

use App\Repositories\EloquentRepository;
use Illuminate\Support\Facades\Auth;
use App\Library\Helpers;
use Jenssegers\Agent\Agent;
use DB;
class MessageUserEloquentRepository extends EloquentRepository implements MessageUserRepositoryInterface
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\MessageUserModel::class;
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
    public function addMsg($txt, $user_by_id = null, $username = null, $admin_reply_id = null, $admin_username= null, $status = 0, $type = 'msg') {

        $oldMsg = $this->_model->where('user_by_id',$user_by_id)->orderby('id', 'desc')->first();
        if($oldMsg)
            $oldMsg->update(['status' => 3]); // 0 chưa xem, 1 đã trả lời, 3 ẩn tn cũ đi
        $result = $this
            ->_model
            ->create([
                'text' => $txt,
                'user_id' => $user_by_id,
                'admin_reply_id' => $admin_reply_id,
                'username' => $username,
                'admin_username' => $admin_username,
//                'read' => 0,
                'status' => $status,
            ]);
        return $result;
    }

}

