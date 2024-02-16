<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Votpatient extends Model
{
    use HasFactory;
    protected $guarded="";
    public function volunteer(){
        return $this->belongsTo(Volunteer::class);
    }
    protected $casts = [
        'start_at' => 'datetime',
    ];
}
