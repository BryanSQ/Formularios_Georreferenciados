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
    $code = $data["code"];

    $new_form = new Form($name, $description, $code, $is_visible);

    $fields = $data["fields"];
    foreach ($fields as $field){
      $field_name = $field["name"];
      $field_is_required = $field["is_required"];
      $field_type = $field["type"];

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

    $new_form->create();

    // returns the new form ID as a JSON string
    echo json_encode(["id" => $new_form->get_id()]);
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

  public function get_validation_errors(array $data, bool $is_new = true): array
  {
    $errors = [];

    if ($is_new && empty($data["name"])) {
      $errors[] = "name is required";
    }

    if (array_key_exists("size", $data)) {
      if (filter_var($data["size"], FILTER_VALIDATE_INT) === false) {
        $errors[] = "size must be an integer";
      }
    }

    return $errors;
  }

  public function get_form_with_answers(string $id)
  {
    $data = Form::get_form_with_answers($id);
    if (!$data){
      return json_encode(["error" => "Form not found"]);
    }

    $id = $data[0]["id"];
    $name = $data[0]["name"];
    $description = $data[0]["description"];
    $code = $data[0]["code"];
    $is_visible = $data[0]["is_visible"];
    $form = new Form($name, $description, $code, $is_visible);
    
    foreach($data as $row){
      $field_id = $row["Field.id"];
      
      if(!$form->has_field($field_id)){
        $field_name = $row["Field.name"];
        $field_is_required = $row["Field.is_required"];
        $field_type = $row["Field_Type.id"];
        $field = new Field($field_id, $field_name, $field_is_required, $field_type);
        $anser_id = $row["Answer.id"];
        $answer = $row["Answer.answer"];
        
        $field->add_answer(new Answer($anser_id, $field_id, $answer));
        $form->add_field($field);
      } else { 
        $field = $form->get_a_field($field_id);
        $anser_id = $row["Answer.id"];
        $answer = $row["Answer.answer"];
        $field->add_answer(new Answer($anser_id, $field_id, $answer));
      
      }
    }
    return json_encode($form);
  }

}