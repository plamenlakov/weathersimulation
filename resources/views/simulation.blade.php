@extends('layouts.app')

@section('content')
    <div class="m-3">
        <h1>Simulation</h1>
        <div id="root"></div>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
@endsection
