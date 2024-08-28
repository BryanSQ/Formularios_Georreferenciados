<?php

require 'Core/Database.php';
require 'Core/Router.php';
require 'Controller/Form.php';

$database = new Database()::get_instance();

$router = new Router();


$router->get('/forms', 'Form@get_form');
$router->post('/forms', 'Form@add_form');
$router->put('/forms/{id}', 'Form@update_form');
$router->delete('/forms/{id}', 'Form@remove_form');


$router->run($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);