@extends('layouts.app')

@section('content')
<div class='container shadow p-3 mb-5 mt-5 bg-white rounded' style='height: 650px'>
    <div class='text-right'>
        {{Auth::user()->email}}
    </div>
    <div class="text-center">
        <img class="rounded thumbnail m-3" src="" alt="profile pic">
    </div>
</div>

@endsection