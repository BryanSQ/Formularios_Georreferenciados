<?php

require 'Model/FieldType.php';

class FieldTypeController{
  public function __construct(){}

  private function load_types_info()
  {
    return [
      "short" => ["id" => 1, "name" => "corto"],
      "long" => ["id" => 2, "name" => "largo"],
      "checkbox" => ["id" => 3, "name" => "casilla de verificación"],
      "select" => ["id" => 4, "name" => "selección"],
      "map" => ["id" => 5, "name" => "mapa"]
    ];
  }

  public function get_field_types(){
    $types_info = $this->load_types_info();
    $field_types = FieldType::get_all();

    // field_types [[id, name]]
    // types_info [key =>[id, name]]

    foreach($field_types as $key => $field_type){
      $field_types[$key]["spanish_name"] = $types_info[$field_type["name"]]["name"];
    }

    
    echo json_encode($field_types);
    return;
  }
}