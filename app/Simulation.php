<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Simulation extends Model
{
 
    protected $fillable = [
        'user_id'
    ];

    protected $table = 'simulation';

    public function user(){
        return $this->hasOne(User::class);
    }


}
