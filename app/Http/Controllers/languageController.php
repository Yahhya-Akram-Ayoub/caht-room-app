<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class languageController extends Controller
{
    //
    public function setLocale(Request $request )
    {

      $request->validate(["language" => "required"]);
        Session::put('locale', $request->language);

        return "success";
    }
}
