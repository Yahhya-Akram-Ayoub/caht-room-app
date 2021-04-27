<?php

namespace App\Http\Controllers;

use App\Events\MessageSend;
use App\Models\MessageModel;
use App\Models\User;
use Illuminate\Http\Request;

class geterMessagesController extends Controller
{
    public function getMessage()
    {

        $response1 = MessageModel::all();
        foreach ($response1 as $mess) {

            $response2  = User::find($mess->user_id);
            $mess->sender =  $response2 ;
        }



        return response()->json($response1);
    }
}
