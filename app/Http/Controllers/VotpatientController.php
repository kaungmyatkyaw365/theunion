<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Volunteer;
use App\Models\Votpatient;
use Dotenv\Validator;
use Illuminate\Http\Request;

class VotpatientController extends Controller
{
    public function index(){
        return view('votpatient',[
            'patients' => Patient::all(),
            'volunteers'=> Volunteer::all(),
            'votpatients'=> Votpatient::all(),        ]);
    }
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate( [
            'type' => 'required|in:pure,hybrid',
            'volunteer_id' => 'required|exists:volunteers,id',
            'patient_id' => 'required|exists:patients,id',
            'start_at' => 'required|date',
        ]);


        // Create a new VotPatient instance
        $votPatient =Votpatient::create([
            'type' => $validatedData['type'],
            'volunteer_id' => $validatedData['volunteer_id'],
            'patient_id' => $validatedData['patient_id'],
            'start_at' =>  $validatedData['start_at'],
        ]);

        // Return a success response
        return response()->json(['message' => 'VotPatient created successfully', 'vot_patient' => $votPatient], 201);
    }

    public function update(Request $request, Votpatient $votpatient)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'type' => 'required|in:pure,hybrid',
        'volunteer_id' => 'required|exists:volunteers,id',
        'patient_id' => 'required|exists:patients,id',
        'start_at' => 'required|date',
    ]);

    // Update the VotPatient instance with the validated data
    $votpatient->update([
        'type' => $validatedData['type'],
        'volunteer_id' => $validatedData['volunteer_id'],
        'patient_id' => $validatedData['patient_id'],
        'start_at' => $validatedData['start_at'],
    ]);

    // Return a success response
    return response()->json(['message' => 'VotPatient updated successfully', 'vot_patient' => $votpatient], 200);
}

public function destory(Votpatient $votpatient){
    $votpatient->delete();
    return response()->json([ 'message' => 'Deleted successfully']);
    }

}
