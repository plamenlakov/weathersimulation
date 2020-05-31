<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('index');
});

Route::get('/simulation', function () {
    return view('simulation');
});

Route::get('/account', function () {
    return view('auth/account');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
