@extends('layouts.app')

@section('content')
<div class='container shadow p-3 mb-5 mt-5 bg-white rounded' style='height: 650px'>
    <div class='text-right'>
        {{Auth::user()->email}}
    </div>
    <div class="text-center">
        <img class="rounded-circle border border-primary img-thumbnail m-3" src="images/profilePics/{{Auth::user()->image}}" alt="profile pic">
        <br>
        <form class="d-inline" enctype="multipart/form-data" action="/account" method="POST">
            <div class="btn-group btn-group-toggle">
                <button class="btn btn-primary" type="button" style="position: relative;">Choose an image<input type="file" style="position:absolute; left:0; top:0; opacity:0; max-width: 137px;" name="image" onchange="document.getElementById('imagePreview').src = window.URL.createObjectURL(this.files[0])"></button>
                <input type="hidden" name="_token" value="{{csrf_token()}}">
                <button type="submit" class="btn btn-success" id="button1">Upload picture</button>
            </div>
            <br>
            <img src="" id="imagePreview" alt="" class="mt-2 rounded-circle" style="max-width: 150px;">
        </form>

    </div>
</div>

@endsection