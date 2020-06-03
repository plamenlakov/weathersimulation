@extends('layouts.app')

@section('content')
<div id="compare"></div>
<div class='container shadow p-3 bg-white rounded'>
    <input type="hidden" value="{{session("simulation1")}}" id="sim1Compare" />
    <input type="hidden" value="{{session("simulation2")}}" id="sim2Compare" />
    <div class='text-right'>
        {{Auth::user()->email}}
        <button type="button" class="btn btn-light rounded-circle ml-1" data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fas fa-cog"></i></button>
    </div>
    <div class="text-center">
        <img class="rounded-circle border border-primary img-thumbnail m-3" src="images/profilePics/{{Auth::user()->image}}" alt="profile pic" style='max-width: 150px'>
        <br>
        <form class="d-inline" enctype="multipart/form-data" action="/accountpic" method="POST">
            <div class="btn-group btn-group-toggle">
                <button class="btn btn-primary" type="button" style="position: relative;">Choose an image<input type="file" style="position:absolute; left:0; top:0; opacity:0; max-width: 137px;" name="image" onchange="document.getElementById('imagePreview').src = window.URL.createObjectURL(this.files[0])"></button>
                <input type="hidden" name="_token" value="{{csrf_token()}}">
                <button type="submit" class="btn btn-success" id="button1">Upload picture</button>
            </div>
            <br>
            <img src="" id="imagePreview" alt="" class="mt-2 rounded-circle" style="max-width: 150px;">
        </form>
        @if(count(Auth::user()->simulations) > 0)
        <div class="container">
            <div class="row">

                @foreach(Auth::user()->simulations as $s)

                <div class="col-md-4 mt-3">
                    <div class="text-left card rounded border border-primary">
                        <img class="card-img-top" src="images/profilePics/default_simulation.png" alt="Card image cap">
                        <div class="card-body">

                            <h5 class="card-title">{{$s->name}}</h5>
                            <a data-toggle="collapse" href="#collapse{{$s->simulation_id + 3614}}" role="button" aria-expanded="false" aria-controls="collapse{{$s->simulation_id  + 3614}}">
                                Description
                            </a>
                            <div class="collapse" id="collapse{{$s->simulation_id + 3614}}">
                                <div class="card card-body text-justify">
                                    <p class="card-text">{{$s->simDescription}}</p>
                                </div>
                            </div>

                            <div class="row justify-content-center">
                                <form class="m-1" action="/simulationRun" method="GET">
                                    <input type="hidden" name="simulation_id" value="{{$s->simulation_id}}" />
                                    <button type="submit" class="btn btn-success"><i class="fas fa-play"></i></button>

                                </form>
                                <form class="m-1" action="POST">
                                    <button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button>

                                </form>

                                <div class="dropdown mt-1 ml-1">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Compare
                                    </button>
                                    <div class="dropdown-menu border border-primary">
                                        @if(count(Auth::user()->simulations) > 1)
                                        @foreach(Auth::user()->simulations as $sCompare)
                                        @if($sCompare->simulation_id != $s->simulation_id)
                                        <form action="/simulationCompare">
                                            <input name="sim1ID" type="hidden" value='{{$s->simulation_id}}'>
                                            <input name="sim2ID" type="hidden" value='{{$sCompare->simulation_id}}'>
                                            <button type="submit" class="btn btn-light dropdown-item">{{$sCompare->name}}</button>
                                        </form>

                                        @endif
                                        @endforeach
                                        @else
                                        <div class="m-2">You do not have any other saved simulations</div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                @endforeach



            </div>

        </div>
        @else
        <div class="alert alert-danger" role="alert">
            You do not have any saved simulations.
        </div>

        @endif
    </div>

</div>
<div class="modal fade bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Change account details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form class="d-inline" enctype="multipart/form-data" action="/account" method="POST">
                <div class="modal-body">

                    Change account details

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection