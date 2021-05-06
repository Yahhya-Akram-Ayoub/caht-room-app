<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\senderController;
use App\Http\Controllers\PassportController;
use App\Http\Controllers\geterMessagesController;



Route::post('login', [PassportController::class , 'login']);
Route::post('register', [PassportController::class , 'register']);

Route::middleware('auth:api')->group(function () {
    Route::post('sendMessage',[senderController::class , 'sendMessage'] );
    Route::post('deletAllMessage', [senderController::class, 'deleteAll']);
    Route::get('getMessage', [geterMessagesController::class, 'getMessage']);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
