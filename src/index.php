<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


require 'Core/Database.php';
require 'Core/Router.php';

require 'Controller/Form.php';
require 'Controller/User.php';
require 'Controller/FieldType.php';



// check preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  if (isset($_SERVER['HTTP_ORIGIN'])) {
      $allowedOrigins = [
          'http://localhost:5173',
          'http://129.159.93.14'
      ];
      
      // check origin
      if (in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
          header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
          header("Access-Control-Allow-Credentials: true");
      }
  }

  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  exit;
}

if (isset($_SERVER['HTTP_ORIGIN'])) {
  $allowedOrigins = [
      'http://localhost:5173',
      'http://129.159.93.14'
  ];

  if (in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
      header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
      header("Access-Control-Allow-Credentials: true");
  }
}

header("Content-Type: application/json; charset=UTF-8");




$database = Database::get_instance();

$router = new Router();

$router->post('/login', 'UserController@login');
$router->post('/logout', 'UserController@logout');

// GET FORMS
$router->get('/home', 'FormController@home');
$router->get('/forms', 'FormController@get_all_forms');
$router->get('/forms/{id}', 'FormController@get_form');
$router->get('/forms/{id}/fields', 'FormController@get_form_with_fields');
$router->get('/forms/search/{code}/fields', 'FormController@get_form_with_fields_by_code'); //TERMINAR
$router->get('/forms/results/map/{id}', 'FormController@get_map_results');
$router->get('/forms/{id}/answers', 'FormController@get_form_with_answers');
$router->get('/fields', 'FieldTypeController@get_field_types');

// POST FORMS
$router->post('/forms', 'FormController@add_form');
$router->post('/forms/{id}/answers', 'FormController@save_answer');
$router->post('/forms/{id}/fields', 'FormController@add_field');
$router->post('/forms/fields/{id}/options', 'FormController@add_option');


// PUT FORMS
$router->put('/forms/{id}', 'FormController@update_form');
$router->put('/forms/fields/{id}', 'FormController@update_field');
$router->put('/forms/fields/options/{id}', 'FormController@update_option');



// DELETE FORMS
$router->delete('/forms/{id}', 'FormController@remove_form');
$router->delete('/forms/fields/options/{id}', 'FormController@delete_option');
$router->delete('/forms/fields/{id}', 'FormController@remove_field');
$router->delete('/forms/{id}/answers', 'FormController@remove_submission');



$router->get('/forms/fields/{code}', 'FormController@search_form_by_code');
$router->get('/forms/results/csv/{id}', 'FormController@get_csv_results');

$request_uri = str_replace('/api', '', $_SERVER['REQUEST_URI']);
$router->run($_SERVER['REQUEST_METHOD'], $request_uri);