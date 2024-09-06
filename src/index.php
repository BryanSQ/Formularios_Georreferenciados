<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


require 'Core/Database.php';
require 'Core/Router.php';

require 'Controller/Form.php';
require 'Controller/User.php';



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  exit;
}


// Set the content type for responses
header("Content-Type: application/json; charset=UTF-8");

// Allow requests from any origin (adjust for security as needed)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Allow specific headers (adjust if needed)
header("Access-Control-Allow-Headers: Content-Type, Authorization");



$database = Database::get_instance();

$router = new Router();

$router->post('/user', 'UserController@login');

$router->get('/home', 'FormController@home');
$router->get('/forms/{id}', 'FormController@get_form');
$router->get('/forms/{id}/fields', 'FormController@get_form_with_fields');
$router->post('/forms/{id}/answers', 'FormController@save_answer');
$router->get('/forms/{id}/answers', 'FormController@get_form_with_answers');
$router->get('/forms', 'FormController@get_all_forms');
// $router->delete('/forms/{id}', 'Form@remove_form');



$router->run($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);