<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return $this->error_return('Credenciais Invalidas', 400);
        }

        //$auth = auth()->user();
        
        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        $token = $user->createToken('API Token');

        return $this->user_return($user, $token->plainTextToken);
    }
}
