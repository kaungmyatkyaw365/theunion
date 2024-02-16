<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\VotpatientController;
use App\Models\Patient;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::middleware(['auth'])->group(function () {
Route::get('/', [HomeController::class,'index'])->name('home');
Route::get('/volunteer', [VolunteerController::class,'index'])->name('volunteer');
Route::get('/patient', [PatientController::class,'index'])->name('patient');
Route::get('/votpatient', [VotpatientController::class,'index'])->name('votpatient');
});



Route::post('/login',[LoginController::class,'authenticate']);
Route::get('/login',[HomeController::class,'login'])->name('login');
Route::get('/logout', [LoginController::class,'logout'])->name('logout');

