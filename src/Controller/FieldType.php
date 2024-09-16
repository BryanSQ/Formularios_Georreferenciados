<?php

require 'Model/FieldType.php';

class FieldTypeController{
  public function __construct(){}

  public function get_field_types(){
    $field_types = FieldType::get_all();
    echo json_encode($field_types);
    return;
  }
}