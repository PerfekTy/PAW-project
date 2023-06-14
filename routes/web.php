<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CookiesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::post('api/register', [RegisterController::class, 'insert']);

Route::get('/', function () {
    return view('welcome');
});