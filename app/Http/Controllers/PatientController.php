<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Regimen;
use App\Models\Volunteer;
use App\Models\Votpatient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(){
        return  view('patient',[
            'patients' => Patient::all(),
            'volunteers' => Volunteer::all(),
            'regimens' => Regimen::all(),
            'votpatients'=> Votpatient::all()

        ]);
    }
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'registration_year' => 'required|numeric|in:2023,2024,2025,2026',
            'dob' => 'required|date',
            'drtb_code' => 'required|unique:patients|numeric',
            'password' => 'required|numeric|min:100000|max:999999',
            'township' => 'required|in:CAT,CMT,PTG,PGT,AMT,MHA,AMP',
            'volunteer_id' => 'required',
            'address' => 'required|max:255',
            'treatment_start_date' => 'required|date',
            'regimen_id' => 'required',
        ]);

        // Generate patient code
        $patientCode = $validatedData['drtb_code'] . '/' . $validatedData['township'] . '/' . $validatedData['registration_year'];

        // Create a new patient instance
        $patient = new Patient();
        $patient->name = $validatedData['name'];
        $patient->registration_year = $validatedData['registration_year'];
        $patient->dob = $validatedData['dob'];
        $patient->age = \Carbon\Carbon::parse($validatedData['dob'])->diffInYears(\Carbon\Carbon::now());
        $patient->drtb_code = $validatedData['drtb_code'];
        $patient->password = bcrypt($validatedData['password']); // Hash the password
        $patient->township = $validatedData['township'];
        $patient->volunteer_id = $validatedData['volunteer_id'];
        $patient->patient_code = $patientCode;
        $patient->address = $validatedData['address'];
        $patient->treatment_start_date = $validatedData['treatment_start_date'];
        $patient->regimen_id = $validatedData['regimen_id'];

        // Save the patient
        $patient->save();

        // Return a response
        return response()->json(['message' => 'Patient created successfully', 'patient' => $patient], 201);
    }

    public function update(Request $request, Patient $patient)
    {
        // Validate request data
        $request->validate([
            'name' => 'required|string|max:255',
            'registration_year' => 'required|numeric',
            'dob' => 'required|date',
            'age' => 'required|numeric',
            'drtb_code' => 'required|numeric|unique',
            'password' => 'required|string|max:255',
            'township' => 'required|string|max:255',
            'volunteer_id' => 'required|',
            'patient_code' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'treatment_start_date' => 'required|date',
            'regimen_id' => 'required',
        ]);


        // Update patient data with new values from the request
        $patient->update([
            'name' => $request->name,
            'registration_year' => $request->registration_year,
            'dob' => $request->dob,
            'age' => $request->age,
            'drtb_code' => $request->drtb_code,
            'password' => $request->password,
            'township' => $request->township,
            'volunteer_id' => $request->volunteer_id,
            'patient_code' => $request->patient_code,
            'address' => $request->address,
            'treatment_start_date' => $request->treatment_start_date,
            'regimen_id' => $request->regimen_id,
        ]);

        // Return the updated patient data
        return response()->json(['message' => 'Patient updated successfully', 'patient' => $patient]);
    }
    public function destory(Patient $patient){
        $patient->delete();
        return response()->json([ 'message' => 'Deleted successfully']);
        }
}
