<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request){
        $full_name = $request->get('full_name');
        $user_name = $request->get('user_name');
        $email = $request->get('email');
        $zipcode = $request->get('cep');

        $list = new User();
        
        if($full_name){
            $list = $list->where('full_name', 'LIKE', "%{$full_name}%");
        }

        if($user_name){
            $list = $list->where('user_name', 'LIKE', "%{$user_name}%");
        }

        if($email){
            $list = $list->where('email', 'LIKE', "%{$email}%");
        }

        if($zipcode){
            $list = $list->where('cep', 'LIKE', "%{$zipcode}%");
        }

        return $list->get();
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'user_name' => 'required|string|max:16|unique:users,user_name',
            'zipcode' => 'required|string|max:8',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|max:16|min:8'
        ]);

        if($validator->fails()){
            return $this->error_return($validator->errors()->first(), 400);
        }

        try{
            $user = new User();
            $user->full_name = $request->get('full_name');
            $user->user_name = $request->get('user_name');
            $user->cep = $request->get('zipcode');
            $user->email = $request->get('email');
            $user->password = bcrypt($request->get('password'));
            $user->save();

            return $this->success_return('Cadastrado com sucesso', $user, 200);
                
        }
        catch(Exception $ex){
            dd($ex);
            return $this->error_return($ex->getMessage(), 400);
        }
    }
}
