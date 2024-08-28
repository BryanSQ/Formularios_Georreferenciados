<?php

class FormController{
  public function __construct(){}

  public function home(){
    return json_encode(["message" => "Welcome to the form API"]);
  }

  private function add_form(array $data){

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
    }

    $new_form->create();

    // returns the new form ID as a JSON string
    return json_encode(["id" => $new_form->get_id()]);
  }

  private function get_form(string $id){
    $form = Form::read($id);
    if (!$form){
      return json_encode(["error" => "Form not found"]);
    }

    return json_encode($form);
  }

  private function update_form(array $data){
    $form = Form::read($data["id"]);
    if (!$form){
      return json_encode(["error" => "Form not found"]);
    }

    $updated_data = array_merge($form, $data); // se supone que mezcla los datos actuales con los datos del formulario 
    
    $updated_form = Form::update($updated_data);

    if(!$updated_form){
      return json_encode(["error" => "Failed to update form"]);
    }

    return json_encode(["id" => $updated_form["id"]]);
  }

  private function remove_form(string $id){    
    $is_deleted = Form::delete($id);
    $result = $is_deleted ? ["success" => "Form deleted"] : ["error" => "Form not found"];
    // returns the result as a JSON string
    return json_encode($result);
  }

  // save the anwsers of a form
  private function save_answer(array $data){

    // data should contain the form_id, and an array of arrays with the field_id and the answer
    // data = { 
    //          form_id,
    //          answers: [{field_id, answer}, {field_id, answer},...]
    //        }

    $form = Form::read($data["form_id"]);
    if (!$form){
      return json_encode(["error" => "Form not found"]);
    }

    $answers = $data["answers"];
    foreach ($answers as $answer){
      $field_id = $answer["field_id"];
      $answer = $answer["answer"];
      new Answer($field_id, $answer)->create();      
    }
    return json_encode(["success" => "Answers saved"]);
  }

  private function get_validation_errors(array $data, bool $is_new = true): array
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

}