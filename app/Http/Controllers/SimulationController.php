<?php

namespace App\Http\Controllers;

use App\Simulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;


class SimulationController extends Controller
{
    public function saveSimulation(Request $req){

        $user = User::findOrFail(Auth::user()->id);

        if($user != null){

            $simulationName = $req->input('simulationName');
            $simulationDescription = $req->input('simulationDesc');

            $simulation = new Simulation();
            $simulation->user_id = $user->id;
            $simulation->name = $simulationName;
            $simulation->simDescription = $simulationDescription;
            $simulation->inputs = "2020: {}";

            $simulation->push();
            return redirect('account');
        }
        else{
            return;
        }
    }
}
