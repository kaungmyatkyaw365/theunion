<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\VotpatientController;
use App\Models\Votpatient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::put('/user/{user:id}', [HomeController::class,'update'])->name('user.update');
Route::delete('/user/{user:id}', [HomeController::class,'destory']);
Route::post('/usercreate', [HomeController::class,'store'])->name('user.store');


Route::post('/createvolunteer', [VolunteerController::class,'store'])->name('volunteer.store');
Route::put('/volunteer/{volunteer:id}', [VolunteerController::class,'update']);
Route::delete('/volunteer/{volunteer:id}', [VolunteerController::class,'destory']);


Route::post('/createpatient', [PatientController::class,'store'])->name('patient.store');
Route::put('/editpatient/{patient:id}', [PatientController::class,'update']);
Route::delete('/editpatient/{patient:id}', [PatientController::class,'destory']);


Route::post('/createvotpatient', [VotpatientController::class,'store']);
Route::put('/votpatient/{votpatient:id}', [VotpatientController::class,'update']);
Route::delete('/votpatient/{votpatient:id}', [VotpatientController::class,'destory']);
