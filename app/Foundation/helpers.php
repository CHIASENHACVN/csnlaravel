<?php
use Illuminate\Contracts\View\Factory as ViewFactory;
use Jenssegers\Agent\Agent;
use App\Models\ErrorLogModel;
use Illuminate\Support\Facades\Auth;

function view($view = null, $data = [], $mergeData = [])
{
    $factory = app(ViewFactory::class);
    if (func_num_args() === 0) {
        return $factory;
    }
    $Agent = new Agent();
    if(strpos($_SERVER['REQUEST_URI'], '/admin') === false) {
        if ($Agent->isMobile()) {
            // you're a mobile device
            if(file_exists(resource_path('views/mobile').'/'.str_replace('.', '/', $view).'.blade.php') === false){
                $view = 'web.'.$view;
            }else{
                $view = 'mobile.'.$view;
            }
        }else{
            $view = 'web.'.$view;
        }
    }else{

    }
    if(strpos($view, '.errors') !== false) {
        ErrorLogModel::create([
            'request' => json_encode(app('request')->route()->getAction()),
            'type' => last(explode('.', $view)),
            'url' => $_SERVER['REQUEST_URI'],
            'view' => '',
            'message' => '',
            'user_id' => Auth::check() ? Auth::user()->id : null,
            'parameter' => json_encode(Request()->all())
        ]);
    }
    return $factory->make($view, $data, $mergeData);
}
function bcrypt($value, $options = [])
{
    return md5($value);
//    return app('hash')->make($value, $options);
}
