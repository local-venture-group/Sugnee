<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\User\FavoritesController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\User\JobsController;
use App\Http\Controllers\Api\User\PagesController;
use App\Http\Controllers\Api\User\ForgotPasswordController;
use App\Http\Controllers\Api\User\ResetPasswordController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//ユーザー側ルート

//Note: Route::prefix('user')内のグループにはURIにuserが付きます。
Route::prefix('user')->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    //ユーザー編集 今は画像のみの編集なので、patchかなーと思うけど、最終的にはputで飛ばすことになるかなという予想。
    Route::match(['put', 'patch'], '/{user}/edit', [UserController::class, 'update'])->name('user.edit');

    Route::get('/pickup', [PagesController::class, 'allPickUpJobs']);
    Route::get('/top', [PagesController::class, 'top'])->name('pages.top');

    //パスワードリセット
    Route::post('/password/request', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('/password/reset', [ResetPasswordController::class, 'resetPassword'])->name('password.reset');
    //Route::prefix('joboffer')内のグループにはjobofferがURIに付きます。
    Route::prefix('/joboffer')->group(function () {
        Route::get('/conditions', [JobsController::class, 'getConditions'])->name('joboffer.conditions');
        Route::get('/search', [JobsController::class, 'searchJobOffers'])->name('joboffer.search');
        Route::get('/{corporationJoboffer}', [JobsController::class, 'showJoboffer'])->name('pickup.show');
    });
    Route::group(['middleware' => ['auth:users']], function () {
        Route::get('/', [UserController::class, 'getAuthUser']);
        Route::put('/joboffer/favorites', [FavoritesController::class, 'omFavorites'])
            ->name('joboffer.favorites.attach');
        Route::delete('/joboffer/favorites', [FavoritesController::class, 'omUnfavorites'])
            ->name('joboffer.favorites.detach');

        Route::put('/frikuJoboffer/{frikuJoboffer}/favorites/', [FavoritesController::class, 'frikuFavorites'])
            ->name('friku_joboffer.favorites.attach');
        Route::delete('/frikuJoboffer/{frikuJoboffer}/favorites/', [FavoritesController::class, 'frikuUnfavorite'])
            ->name('friku_joboffer.favorites.detach');
    });
});







//管理者用ルート
Route::prefix('admin', function () {
    Route::post('/register', [AdminController::class, 'register']);
    Route::post('/login', [AdminController::class, 'login']);
    Route::group(['middleware' => ['auth:admins']], function () {
        Route::post('/logout', [AdminController::class, 'logout']);
        Route::get('/', function (Request $request) {
            return $request->user();
        });
    });
});
