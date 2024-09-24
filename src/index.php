<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


require 'Core/Database.php';
require 'Core/Router.php';

require 'Controller/Form.php';
require 'Controller/User.php';
require 'Controller/FieldType.php';



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

$router->post('/login', 'UserController@login');

$router->get('/home', 'FormController@home');
$router->get('/forms', 'FormController@get_all_forms');
$router->get('/forms/{id}', 'FormController@get_form');
$router->get('/forms/{id}/fields', 'FormController@get_form_with_fields');
$router->get('/forms/results/map/{id}', 'FormController@get_map_results');
$router->get('/fields', 'FieldTypeController@get_field_types');


$router->get('/forms/{id}/answers', 'FormController@get_form_with_answers');

$router->post('/forms/{id}/answers', 'FormController@save_answer');

$router->post('/forms', 'FormController@add_form');

$router->put('/forms/{id}', 'FormController@update_form');

$router->delete('/forms/{id}', 'FormController@remove_form');

$router->put('/forms/fields/{id}', 'FormController@update_field');


$router->post('/forms/fields/{id}/options', 'FormController@add_option');

$router->delete('/forms/fields/options/{id}', 'FormController@delete_option');

$router->put('/forms/fields/options/{id}', 'FormController@update_option');

$router->get('/forms/fields/{code}', 'FormController@search_form_by_code');

$request_uri = str_replace('/api', '', $_SERVER['REQUEST_URI']);
$router->run($_SERVER['REQUEST_METHOD'], $request_uri);