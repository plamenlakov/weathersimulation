<?php

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;
use App\User;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function updatePicture(Request $req)
    {

        $user = User::findOrFail(Auth::user()->id);

        if ($req->hasFile('image')) {
            $path = $req->file('image');
            $filename = time() . '.' . 'png';
            $img = Image::make($path)->fit(150, 150);
            $mask = Image::canvas(150, 150);

            $mask->circle(150, 150 / 2, 150 / 2, function ($draw) {
                $draw->background('#fff');
            });
            $img->mask($mask, false)->save(public_path('images/profilePics/' . $filename));
            $user->image = $filename;
            $user->push();

            //has to return the view in order to refresh
            return back();
        } else {

            return back();
        }
    }
}
