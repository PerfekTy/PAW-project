<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ClothesController;
use App\Http\Controllers\Api\DeliveryController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/home/{id}', [CartController::class, 'saveItemsToCart']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/cart', [CartController::class, 'getItems']);
    Route::get('/wardrobe', [ClothesController::class, 'getClothes']);
    Route::get('/home', [ClothesController::class, 'getAllClothes']);
    Route::get('/photos', [ClothesController::class, 'getPhotos']);
    Route::get('/cards', [CardController::class, 'getCards']);
    Route::get('/home/{id}', [ClothesController::class, 'getCurrentCloth']);
    Route::get('/sell/{id}', [ClothesController::class, 'getCurrentCloth']);
    Route::get('/account/courier', [DeliveryController::class, 'getCourier']);

    Route::delete('/cards', [CardController::class, 'destroyCard']);
    Route::delete('/cart/{id}', [CartController::class, 'deleteItemFromCart']);
    Route::delete('/cart', [CartController::class, 'deleteAllItemsFromCart']);

    Route::apiResource('/account/details', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/account/payment', [CardController::class, 'saveCard']);

Route::post('/account/details/{nickname}', [UserController::class, 'update']);

Route::post('/upload', [ClothesController::class, 'addPhoto']);

Route::post('/sell', [ClothesController::class, 'store']);

Route::post('/cart', [CartController::class, 'storeCart']);

Route::post('/account/courier', [DeliveryController::class, 'storeCourier']);