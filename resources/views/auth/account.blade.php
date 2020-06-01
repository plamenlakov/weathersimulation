@extends('layouts.app')

@section('content')
<div class='container shadow p-3 bg-white rounded'>
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

        <div class="container">
            <div class="row">
                @foreach(Auth::user()->simulations as $s)

                <div class="col-md-4 mt-3">
                    <div class="card">
                        <img class="card-img-top" src="images/flags/Netherlands.png" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{$s->name}}</h5>
                            <p class="card-text">{{$s->simDescription}}</p>
                            <div class="row justify-content-center">
                                <form class="m-1" action="POST">
                                    <button type="button" class="btn btn-success"><i class="fas fa-play"></i></button>

                                </form>
                                <form class="m-1" action="POST">
                                    <button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button>

                                </form>
    
                                <div class="dropdown mt-1 ml-1">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Compare with...
                                    </button>
                                    <div class="dropdown-menu">
                                        @foreach(Auth::user()->simulations as $sCompare)
                                        @if($sCompare->simulation_id != $s->simulation_id)
                                        <a class="dropdown-item" href="#">{{$sCompare->name}}</a>
                                        @endif
                                        @endforeach
                                    </div>
                                </div>






                            </div>
                        </div>
                    </div>
                </div>

                @endforeach
            </div>

        </div>
    </div>

</div>

@endsection