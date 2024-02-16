<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    use HasFactory;
    protected $guarded="";

    public function patient(){
        return $this->hasMany(Patient::class);
    }
    public function votpatient(){
        return $this->hasMany(Votpatient::class);
    }
}
