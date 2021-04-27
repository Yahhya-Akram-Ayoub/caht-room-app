<?php

namespace App\Http\Controllers;

use App\Events\sender;
use App\Models\MessageModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class senderController extends Controller
{

    public function sendMessage(Request $request)
    {

         $request->validate(['text' => 'required']);


        $message = new MessageModel();
        $message->text = $request->text;
        $message->user_id =  Auth::user()->id;
        $message->save();

        event(new sender($message ));

        return response()->json([
            'status' => 'success',
        ]);
    }


    public function deleteAll()
    {
        MessageModel::truncate();
    }


}
