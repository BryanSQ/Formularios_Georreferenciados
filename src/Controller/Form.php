<?php

require 'Model/Form.php';
require 'Model/Field.php';
require 'Model/Answer.php';
require 'Model/Option.php';
require 'Model/Submission.php';
require 'Model/MapCoordinates.php';
require 'Model/Log.php';

class FormController
{
  public function __construct()
  {
  }

  public function home()
  {
    http_response_code(200);
    echo json_encode(["message" => "Welcome to the form API"]);
    return;
  }

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

  public function add_form()
  {

    session_start();


    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data["name"];
    $description = $data["description"];
    $is_visible = $data["is_visible"];

    $new_form = new Form($name, $description, $is_visible);

    $fields = $data["fields"];
    foreach ($fields as $field) {
      $field_name = $field["name"];
      $field_is_required = $field["is_required"];
      $field_type = $field["type_id"];

      $new_field = new Field($field_name, $field_is_required, $field_type);
      $new_form->add_field($new_field);

      if ($field_type === "3" || $field_type === "4") {
        $options = $field["options"];
        foreach ($options as $option) {
          $new_option = new Option($option);
          $new_field->add_option($new_option);
        }
      }
    }

    $new_form_id = $new_form->create();

    $user_id = User::get_by_email($_SESSION["email"]);

    $log = new Log();
    if (!$log->create($user_id["id"], "Created form with ID: $new_form_id, title: $name")){
      echo json_encode(["error" => "Failed to create log"]);
    }
    

    // returns the new form ID as a JSON string
    echo json_encode(["id" => $new_form_id]);
    return;
  }

  public function get_form(string $id)
  {
    $form = Form::read($id);
    if (!$form) {
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    echo json_encode($form);
    return;
  }

  public function get_form_with_fields(string $id)
  {
    $form = Form::read($id);
    if (!$form) {
      http_response_code(404);
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    $fields = Form::get_fields($id);

    if (!$fields) {
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

  public function get_form_with_fields_by_code(string $code)
  {
    $found = Form::search_by_code($code);
  
    if (!$found) {
      http_response_code(404);
      echo json_encode(["error" => "Form not found"]);
      return;
    }
    $id = $found["id"];
    $form = Form::read($id);
    $fields = Form::get_fields($id);

    if (!$fields) {
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

  public function get_all_forms()
  {

    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $forms = Form::get_all();
    if (!$forms) {

      if (count($forms) == 0) {
        echo json_encode($forms);
        return;
      }

      http_response_code(404);
      echo json_encode(["error" => "No forms found"]);
      return;
    }

    echo json_encode($forms);
    return;
  }

  public function update_form(string $id)
  {

    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $form = Form::read($id);
    if (!$form) {
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    $updated_data = array_merge($form, $data); // se supone que mezcla los datos actuales con los datos del formulario 
    $updated_form = Form::update($updated_data);

    if (!$updated_form) {
      echo json_encode(["error" => "Failed to update form"]);
      return;
    }

    $name = $updated_form["name"];


    $user_id = User::get_by_email($_SESSION["email"]);

    $log = new Log();
    $log->create($user_id["id"], "Updated form with ID: {$updated_form["id"]}, title: $name");

    echo json_encode(["id" => $updated_form["id"]]);
    return;
  }

  public function update_field(string $id)
  {
    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }


    $data = json_decode(file_get_contents("php://input"), true);
    $field = Field::read($id);
    if (!$field) {
      echo json_encode(["error" => "Field not found"]);
      return;
    }

    $updated_data = array_merge($field, $data);
    $updated_field = Field::update($updated_data);

    if (!$updated_field) {
      echo json_encode(["error" => "Failed to update field"]);
      return;
    }

    $name = $updated_field["name"];

    $user_id = User::get_by_email($_SESSION["email"]);

    $log = new Log();
    $log->create($user_id["id"], "Updated field with ID: {$updated_field["id"]}, value: $name");

    echo json_encode(["id" => $updated_field["id"]]);
    return;
  }

  public function remove_form(string $id)
  {
    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $is_deleted = Form::delete($id);

    if (!$is_deleted) {
      http_response_code(404);
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    $user_id = User::get_by_email($_SESSION["email"]);

    $log = new Log();
    $log->create($user_id["id"], "Deleted form with ID: $id");
    

    // returns the result as a JSON string
    echo json_encode(["success" => "Form deleted"]);
    return;
  }

  // save the anwsers of a form
  public function save_answer(string $id)
{
    $types_info = $this->load_types_info();
    $data = json_decode(file_get_contents("php://input"), true);


    // data should contain the form_id, and an array of arrays with the field_id and the answer
    // data = { 
    //          form_id,
    //          fields: [{field_id, answer, type_id}, {field_id, answer, type_id},...]
    //        }

    $form = Form::read($id);
    if (!$form) {
        http_response_code(404);
        echo json_encode(["error" => "Form not found"]);
        return;
    }

    $submission = new Submission($id);
    $submission_id = $submission->create();

    $fields = $data["fields"];
    foreach ($fields as $field) {
        $field_id = $field["field_id"];
        $field_exists = Field::read($field_id);

        if (!$field_exists) {
            http_response_code(404);
            echo json_encode(["error" => "Field not found"]);
            return;
        }

        $answer = $field["answer"];
        $type_id = $field["type_id"] ?? null; // Asegúrate de que type_id esté presente

        // Manejo de respuestas para el tipo de campo mapa
        if ((int)$type_id === (int)$types_info["map"]["id"]) {
            

            if (empty($answer)) {
                http_response_code(400);
                echo json_encode(["error" => "No coordinates provided"]);
                return;
            }

            $coordinates = explode(",", $answer);

            if (count($coordinates) !== 2) {
                http_response_code(400);
                echo json_encode(["error" => "Invalid coordinates format"]);
                return;
            }

            $lat = trim($coordinates[0]);
            $lng = trim($coordinates[1]);

            // Verifica que las coordenadas sean válidas
            if (!is_numeric($lat) || !is_numeric($lng)) {
                http_response_code(400);
                echo json_encode(["error" => "Coordinates must be numeric"]);
                return;
            }

            $map = new MapCoordinates($field_id, $submission_id, $lat, $lng);
            $map->create();
        } else {
            // Para otros tipos de campo, guarda la respuesta
            $new_answer = new Answer($field_id, $submission_id, $answer);
            $new_answer->create();
        }
    }
    echo json_encode(["success" => "Answers saved"]);
    return;
}


  public function get_map_results(string $id)
  {
    // get answers where field type is map
    $form = Form::read($id);
    $map = Form::get_map_results_by_id($id);

    if (!$map) {
      http_response_code(404);
      echo json_encode(["error" => "¡No se encontraron mapas para este formulario!"]);
      return;
    }
    $map_results = [
      'form' => $form,
      'results' => $map,
    ];

    echo json_encode($map_results);
    return;
  }

  public function get_form_with_answers(string $id)
  {
    $form = Form::read($id);
    if (!$form) {
      http_response_code(404);
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    $answers = Form::get_form_with_answers($id);

    if (!$answers) {
      http_response_code(404);
      echo json_encode(["error" => "Form has no answers"]);
      return;
    }

    $form_with_answers = [
      'form' => $form,
      'answers' => $answers,
    ];

    echo json_encode($form_with_answers);
    return;
  }

  public function add_option(string $id)
  {

    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    $field = Field::read($id);
    if (!$field) {
      echo json_encode(["error" => "Field not found"]);
      return;
    }

    $option = $data["value"];
    $new_option = new Option($option);
    $new_option->create($id);

    $user_id = User::get_by_email($_SESSION["email"]);

    $log = new Log();
    $log->create($user_id["id"], "Added option to field with ID: $id, value: $option");
    

    echo json_encode(["success" => "Options added"]);
    return;
  }
  //forms/fields/options/5
  public function delete_option(string $id)
  {
    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $option = Option::read($id);
    if (!$option) {
      echo json_encode(["error" => "Option not found"]);
      return;
    }

    $is_deleted = Option::delete($id);
    $result = $is_deleted ? ["success" => "Option deleted"] : ["error" => "Option not found"];

    if (!$is_deleted) {
      echo json_encode($result);
      return;
    }

      $user_id = User::get_by_email($_SESSION["email"]);
      $log = new Log();
      $log->create($user_id["id"], "Deleted option with ID: $id");
    // returns the result as a JSON string
    echo json_encode($result);
    return;
  }

  public function update_option(string $id)
  {
    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $option = Option::read($id);
    if (!$option) {
      echo json_encode(["error" => "Option not found"]);
      return;
    }

    $new_value = $data["value"];
    $updated_option = Option::update($id, $new_value);

    if (!$updated_option) {
      echo json_encode(["error" => "Failed to update option"]);
      return;
    }

    $user_id = User::get_by_email($_SESSION["email"]);
    $log = new Log();
    $log->create($user_id["id"], "Updated option with ID: $id, value: $new_value");

    echo json_encode(["success" => "Option updated"]);
    return;
  }

  public function add_field(string $id)
  {
    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $types_info = $this->load_types_info();
    $data = json_decode(file_get_contents("php://input"), true);

    $field_name = $data["name"];
    $field_is_required = $data["is_required"];
    $field_type = (int)$data["type_id"];


    $new_field = new Field($field_name, $field_is_required, $field_type);

    if ($field_type === $types_info["checkbox"]["id"] || $field_type === $types_info["select"]["id"]) {
      $options = $data["options"];
      foreach ($options as $option) {
        $new_option = new Option($option);
        $new_field->add_option($new_option);
      }
    }

    $new_field_id = $new_field->create($id);

    $user_id = User::get_by_email($_SESSION["email"]);

    $log = new Log();
    $log->create($user_id["id"], "Added field to form with ID: $id, title: $field_name");

    // returns the new field ID as a JSON string
    echo json_encode(["id" => $new_field_id]);
    return;
  }

  public function remove_field(string $id)
  {

    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $is_deleted = Field::delete($id);
    $result = $is_deleted ? ["success" => "Field deleted"] : ["error" => "Field not found"];

    if (!$is_deleted) {
      echo json_encode($result);
      return;
    }

    $user_id = User::get_by_email($_SESSION["email"]);
    $log = new Log();
    $log->create($user_id["id"], "Deleted field with ID: $id");

    // returns the result as a JSON string
    echo json_encode($result);
    return;
  }
  
  public function search_form_by_code(string $code){
    $form = Form::search_by_code($code);
    
    if (!$form){
      http_response_code(404);
      echo json_encode(["error" => "Form not found"]);
      return;
    }

    echo json_encode($form);
    return;
  }

  public function get_csv_results(string $id){
    $form = Form::read($id);
    if (!$form) {
      http_response_code(404);
      echo json_encode(["error" => "Form not found"]);
      return;
    }

  
    $answers = Form::get_map_results_by_id($id);
    if (!$answers) {
        http_response_code(404);
        echo json_encode(["error" => "Form has no answers"]);
        return;
    }

    //echo json_encode($answers);
    //echo json_encode($answers[0]);
    //echo json_encode($answers[0]["answers"]);
    $csv = "";
    $fields = $answers[0]["fields"];

    foreach ($fields as $field) {
        $csv .= $field["field_name"] . ",";
    }
    $csv = rtrim($csv, ",") . "\n"; 

    foreach ($answers as $answer) {
      foreach ($answer["fields"] as $ans) {
        if($ans["field_type"] == 5){
          $csv .= isset($ans["answer"]) ? '"' . $ans["answer"] . '",' : ",";   
        } else {
          $csv .= isset($ans["answer"]) ? $ans["answer"] . "," : ",";   
        }
      }
      $csv = rtrim($csv, ",") . "\n"; 
    }

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="results.csv"');
    echo $csv;
    return;

  }


  public function remove_submission(int $id):void {
    session_start();

    if (!isset($_SESSION["email"])) {
      http_response_code(401);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $is_submission_deleted = Submission::delete($id);
    echo json_encode($is_submission_deleted);
    $result = $is_submission_deleted ? ["success" => "Submission deleted"] : ["error" => "Submission not found"];

    if (!$is_submission_deleted) {
      echo json_encode($result);
      return;
    }

    $user_id = User::get_by_email($_SESSION["email"]);
    $log = new Log();
    $log->create($user_id["id"], "Deleted submission with ID: $id");


    // returns the result as a JSON string
    echo json_encode($result);
    return;
  }

}