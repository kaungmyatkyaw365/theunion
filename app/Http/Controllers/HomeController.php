<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    public function login(){
        return view('login');
    }
    public function index(){
        return view('home',[
            'accounts'=> User::all()
        ]);
    }
    public function store(Request $request){
    // Validate the incoming request data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'role' => 'required|in:admin,m&e_manager,project_manager',
    ]);

    try {
        // Create a new user with the validated data
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
        ]);

        return response()->json(['user' => $user, 'message' => 'User created successfully'], 201);
    } catch (\Exception $e) {
        // Handle any exceptions that might occur during user creation
        return response()->json(['error' => 'User creation failed: ' . $e->getMessage()], 500);
    }
}
public function update(Request $request, User $user)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        'role' => 'required|in:admin,m&e_manager,project_manager',
    ]);

    try {
        // Update the user with the validated data
        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'role' => $validatedData['role'],
        ]);

        return response()->json(['user' => $user, 'message' => 'User updated successfully'], 200);
    } catch (\Exception $e) {
        // Handle any exceptions that might occur during user update
        return response()->json(['error' => 'User update failed: ' . $e->getMessage()], 500);
    }
}

public function destory(User $user){
    $user->delete();
    return response()->json([ 'message' => 'User deleted successfully']);
}


}
