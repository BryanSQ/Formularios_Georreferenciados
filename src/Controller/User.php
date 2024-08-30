<?php

require 'Model/User.php';

class UserController{
  public function login(){
    $data = json_decode(file_get_contents("php://input"), true);
    // check if the email and password are set
    if(!isset($data["email"]) || !isset($data["password"])){
      http_response_code(400);
      echo json_encode(["error" => "Email and password are required"]);
      return;
    }
      
      
    $email = $data["email"];
    $password = $data["password"];

    if($email == "" || $password == ""){
      http_response_code(400);
      echo json_encode(["error" => "Email and password are required"]);
      return;
    }

    $user_exists = User::login($email, $password);
    if(!$user_exists){
      http_response_code(401);
      echo json_encode(["error"=> "User not found"]);
      return;
    }

    http_response_code(200);
    echo json_encode(["success"=> "Welcome"]);
    return;
  }


}