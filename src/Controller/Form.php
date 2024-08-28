<?php

class FormController{
  public function __construct(){}

  public function process_request(string $method, ?string $id, ?string $code){
    if ($id){
      $this->process_resource_request($method, $id, $code);
    }
    else{
      $this->process_collection_request($method);
    }
  }

  private function process_resource_request(string $method, ?string $id, ?string $code){
    switch ($method){
      case "DELETE":
        echo $this->remove_form($id);
        break;
      default:
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
        break;
    }
    
  }

  private function process_collection_request(string $method){
    switch ($method) {
      case "GET":        
        http_response_code(201);
        echo json_encode(["forms" => Form::get_all()]);
        break;
      
      case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $errors = $this->get_validation_errors($data);

        if (!empty($errors)){
          http_response_code(400);
          echo json_encode(["errors" => $errors]);
          break;
        }

        echo $this->add_form($data);
        break;

      default:
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
        break;
    }
  }

  private function add_form(array $data){
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

  private function update_form(string $id, array $data){
    $form = Form::read($id);
    if (!$form){
      return json_encode(["error" => "Form not found"]);
    }

    $updated_data = array_merge($form, $data); // se supone que mezcla los datos actuales con los datos del formulario

    // el update no es estático, por lo que debo crear una instancia para usarlo. 
    $form = new Form("", "", 0, false);
    $updated_form = $form->update($updated_data);

    if(!$updated_form){
      return json_encode(["error" => "Failed to update form"]);
    }

    return json_encode(["id" => $id]);
  }

  private function remove_form(string $id){    
    $is_deleted = Form::delete($id);
    $result = $is_deleted ? ["success" => "Form deleted"] : ["error" => "Form not found"];
    // returns the result as a JSON string
    return json_encode($result);
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