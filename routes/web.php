<?php

use App\Events\MessageSend;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\senderController;
use App\Http\Controllers\languageController;
use App\Http\Controllers\geterMessagesController;
use Illuminate\Support\Facades\Broadcast;

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

Route::middleware('auth')->get('/', function () {
    return view('home');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('language', [languageController::class, 'setLocale'])->name('language');

Route::post('sendMessage',[senderController::class , 'sendMessage'] );
Route::post('deletAllMessage', [senderController::class, 'deleteAll']);
Route::get('getMessage', [geterMessagesController::class, 'getMessage']);
