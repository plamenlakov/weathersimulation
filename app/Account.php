<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [
        'id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

}
