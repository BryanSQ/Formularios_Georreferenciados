<?php

require 'Model/Form.php';
require 'Model/Field.php';
require 'Model/Answer.php';
require 'Model/Option.php';

class FormController{
  public function __construct(){}

  public function home(){
    http_response_code(200);
    echo json_encode(["message" => "Welcome to the form API"]);
    return;
  }

  public function add_form(){

    $data = json_decode(file_get_contents("php://input"), true);


    $name = $data["name"];
    $description = $data["description"];
    $is_visible = $data["is_visible"];

    $new_form = new Form($name, $description, $is_visible);

    $fields = $data["fields"];
    foreach ($fields as $field){
      $field_name = $field["name"];
      $field_is_required = $field["is_required"];
      $field_type = $field["type_id"];

      $new_field = new Field($field_name, $field_is_required, $field_type);
      $new_form->add_field($new_field);

      if ($field_type === "select" || $field_type === "checkbox"){ {
        $options = $field["options"];
        foreach ($options as $option){
          $new_option = new Option($option);
          $new_field->add_option($new_option);
        }
      }

    }

    $new_form_id = $new_form->create();



    // returns the new form ID as a JSON string
    echo json_encode(["id" => $new_form_id]);
    return;
  }
}

  public function get_form(string $id){
    $form = Form::read($id);
    if (!$form){
      echo json_encode(["error" => "Form not found"]);
      return;
    }
    
    echo json_encode($form);
    return;
  }

  public function get_form_with_fields(string $id){
    $form = Form::read($id);
    if (!$form){
      http_response_code(404);
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    $fields = Form::get_fields($id);

    if (!$fields){
      http_response_code(404);
      echo json_encode(["error" => "Form does not have fields"]);
      return;
    }
    
    $form_with_fields = [
      'form' => $form,
      'fields' => $fields,
    ];

    echo json_encode($form_with_fields);
    return;
  }

  public function get_all_forms(){
    $forms = Form::get_all();
    if (!$forms){

      http_response_code(404);
      echo json_encode(["error" => "No forms found"]);
      return;
    }
    
    echo json_encode($forms);
    return;
  }

  public function update_form(array $data){
    $form = Form::read($data["id"]);
    if (!$form){
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    $updated_data = array_merge($form, $data); // se supone que mezcla los datos actuales con los datos del formulario 
    
    $updated_form = Form::update($updated_data);

    if(!$updated_form){
      echo json_encode(["error" => "Failed to update form"]);
      return;
    }

    echo json_encode(["id" => $updated_form["id"]]);
    return;
  }

  public function remove_form(string $id){    
    $is_deleted = Form::delete($id);
    $result = $is_deleted ? ["success" => "Form deleted"] : ["error" => "Form not found"];
    // returns the result as a JSON string
    echo json_encode($result);
    return;
  }

  // save the anwsers of a form
  public function save_answer(string $id){
    $data = json_decode(file_get_contents("php://input"), true);

    // data should contain the form_id, and an array of arrays with the field_id and the answer
    // data = { 
    //          form_id,
    //          fields: [{field_id, answer}, {field_id, answer},...]
    //        }

    $form = Form::read($id);
    if (!$form){
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    $fields = $data["fields"];
    foreach ($fields as $field){
      $field_id = $field["field_id"];

      $field_exists = Field::read($field_id);

      if (!$field_exists){
        echo json_encode(["error" => "Field not found"]);
        return;
      }
      
      $answer = $field["answer"];

      $new_answer = new Answer($field_id, $answer);
      
      $new_answer->create();
    }
    echo json_encode(["success" => "Answers saved"]);
    return;
  }

  public function get_map_results(){
    
  }

}
