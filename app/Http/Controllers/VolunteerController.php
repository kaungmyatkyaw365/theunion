<?php

namespace App\Http\Controllers;

use App\Models\Volunteer;
use Illuminate\Http\Request;
use Stringable;

class VolunteerController extends Controller
{
    public function index(){
        return view('volunteer',[
            'volunteers'=> Volunteer::all()
        ]);
    }
    public function store(Request $request)
{
    // Validate the request data
    $validatedData = $request->validate([
        'name' => 'required|max:16',
        'password' => 'required',
        'email' => 'required|email|unique:volunteers',
        'township' => 'required|in:CAT,CMT,PTG,PGT,AMT,MHA,AMP',
    ]);


    // Create a new volunteer
    $volunteer = Volunteer::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'township' => $validatedData['township'],
        'password' =>  $validatedData['password'],
    ]);

    // Redirect back to the volunteers page with a success message
    return redirect()->back()->with('success', "Volunteer '$validatedData[name]' has been created ");
}
public function update(Request $request, $id)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'name' => 'required|max:16',
        'password' => 'required',
        'email' => 'required|email|unique:volunteers,email,' . $id,
        'township' => 'required|in:CAT,CMT,PTG,PGT,AMT,MHA,AMP',
    ]);

    try {
        // Find the volunteer by ID
        $volunteer = Volunteer::findOrFail($id);

        // Update the volunteer attributes
        $volunteer->name = $validatedData['name'];
        $volunteer->email = $validatedData['email'];
        $volunteer->township = $validatedData['township'];
        $volunteer->password = $validatedData['password']; // Make sure to handle password hashing if necessary

        // Save the changes
        $volunteer->save();

        // Return a success response
        return response()->json(['message' => "Volunteer '$validatedData[name]' has been updated"], 200);
    } catch (\Exception $e) {
        // Handle any errors
        return response()->json(['message' => 'Error updating volunteer: ' . $e->getMessage()], 500);
    }
}

public function destory(Volunteer $volunteer){
$volunteer->delete();
return response()->json([ 'message' => 'Deleted successfully']);
}

}
