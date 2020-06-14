<?php

namespace App\Http\Controllers;

use App\Simulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\Session as Session;
use OAuthProvider;


class SimulationController extends Controller
{
    public function saveSimulation(Request $req){

        if(Auth::check()){
            $user = User::findOrFail(Auth::user()->id);
            $simulationName = $req->input('simulationName');
            $simulationDescription = $req->input('simulationDesc');
            $simInputs = $req->input('inputsInfo');

            $simulation = new Simulation();
            $simulation->user_id = $user->id;
            $simulation->name = $simulationName;
            $simulation->simDescription = $simulationDescription;
            $simulation->inputs = $simInputs;
            $simulation->token =  bin2hex(random_bytes(6));
            $simulation->token .= substr(microtime(),-2);

            $simulation->push();
            return redirect('account');
        }
        else{
            return redirect("register");
        }
    }

    public function getInfoForTwoSimulations(Request $req){
        $sim1ID = $req->input('sim1ID');
        $sim2ID = $req->input('sim2ID');

        $simulation1 = Simulation::findOrFail($sim1ID);
        $simulation2 = Simulation::findOrFail($sim2ID);

        return redirect('account')->with('simulation1', $simulation1->inputs)->with('simulation2', $simulation2->inputs)->with('simulation1Name', $simulation1->name)->with('simulation2Name', $simulation2->name);
    }

    public function changeDescription(Request $req){
        $simulation_id = $req->input('simulation_id');
        $simulation = Simulation::findOrFail($simulation_id);
        $description = $req->input('simDescription');

        $simulation->simDescription = $description;
        $simulation->push();
        Session::flash('message', ['text'=> $simulation->name . ' description changed successfully!', 'type'=>'success']);
        return redirect('account');

    }

    public function deleteSimulation(Request $req){
        $simulation_id = $req->input('simulation_id');
        $simulation = Simulation::findOrFail($simulation_id);
        $simulation->delete();
        
        Session::flash('message', ['text'=>$simulation->name . ' deleted successfully!', 'type'=>'success']);
        return redirect('account');
    }

    public function reRunSimulation(Request $req){
        $simulation_id = $req->input('simulation_id');
        $simulation = Simulation::findOrFail($simulation_id);
        return redirect('simulation')->with('input_simulation', $simulation->inputs);
    }

    public function startFromToken(Request $req){
        $token = $req->input('tokenInput');
        $simulation = Simulation::where('token','=', $token)->get();
        if(count($simulation) > 0){
            return redirect('simulation')->with('input_simulation', $simulation[0]->inputs);
        }
        else{
            Session::flash('message', ['text'=> 'There is no simulation with this token!', 'type'=>'danger']);
            return redirect('account');
        }
    }
}
