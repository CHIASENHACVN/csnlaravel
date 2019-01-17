<?php

namespace App\Exceptions;

use Exception;
use App\Library\Helpers;
use Jenssegers\Agent\Agent;
use App\Models\ErrorLogModel;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
//    public function render($request, Exception $exception)
//    {
//        return parent::render($request, $exception);
//    }
    public function render($request, Exception $exception)
    {
        if (method_exists($exception, 'getMessage')){
            if($exception->getMessage() == 'Unauthenticated.') {
                return $request->expectsJson()
                    ? response()->json(['status' => false, 'message' => $exception->getMessage(), 'data' => null], 401)
                    : redirect()->guest('?rq=login&back_url='.$request->getRequestUri());
            }elseif ($exception->getMessage() == 'The given data was invalid.') {
                return parent::render($request, $exception);
            }
        }
        if(method_exists($exception, 'getStatusCode')) {
            if($exception->getStatusCode() == 422) {
                // Validation
                return parent::render($request, $exception);
            }elseif($exception->getStatusCode() == 403){
                if($request->ajax()) {
                    if($request->format() == 'html') {
                        return response()->make($exception->getMessage(), 403);
                    }
                    Helpers::ajaxResult(false, $exception->getMessage(), null);
                }
                $Agent = new Agent();
                $view = 'web.';
                if ($Agent->isMobile()) {
                    $view = 'mobile.';
                }
                return response()->view($view.'errors.403', ['message'=> $exception->getMessage()], 403);
            }elseif ($exception->getStatusCode() == 404) {
                redirect()->guest('/');
            }
        }
        if(env('APP_DEBUG') && env('APP_ENV') != 'local') {
            $error = ErrorLogModel::where('type', 'exception')->where('url', $_SERVER['REQUEST_URI'])->where('message', $exception->getMessage())->first();
            if(!$error) {
                $error = ErrorLogModel::create([
                    'request' => json_encode(app('request')->route()->getAction()),
                    'type' => 'exception',
                    'url' => $_SERVER['REQUEST_URI'],
                    'view' => '',
                    'note' => 'file: '.$exception->getFile().'; ',
                    'message' => $exception->getMessage(),
                    'parameter' => json_encode(Request()->all())
                ]);
            }
            abort(403, 'Lỗi '.$error->id.' Bạn vui lòng gửi mã lỗi này đến quan trị để khắc phục sớm nhất.');
        }
        return parent::render($request, $exception);
    }
}
