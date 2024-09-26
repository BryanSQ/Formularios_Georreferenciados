<?php

class Form
{
  private int $id;
  private string $name;
  private string $description;

  // could change this implementation to use just the ID.
  private User $user;

  // random generated code, uniqid();
  private string $code;

  // is_active could be a better name
  private bool $is_visible;
  private PDO $connection;

  private array $fields = [];


  public function __construct(string $name, string $description, bool $is_visible)
  {
    $this->name = $name;
    $this->description = $description;
    $this->is_visible = $is_visible;
  }

  public function add_field(Field $field)
  {
    $this->fields[] = $field;
  }

  public function get_a_field(int $field_id): Field|null
  {
    foreach ($this->fields as $field) {
      if ($field->get_id() == $field_id) {
        return $field;
      }
    }
    // No field found with the given field ID, return null or throw an exception depending on your requirements.
    return null;
  }

  // getters and setters
  public function get_id(): int
  {
    return $this->id;
  }

  // check if the form has a specific field with his id
  public function has_field(int $field_id): bool
  {
    foreach ($this->fields as $field) {
      if ($field->get_id() == $field_id) {
        return true;
      }
    }
    return false;
  }


  // get all forms 

  public static function get_all(): array
  {
    // change * to the column names when the table is created
    $sql = "SELECT id, name, description, is_visible FROM Form";
    $stmt = Database::get_instance()->get_connection()->query($sql);

    $data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $data[] = $row;
    }
    return $data;
  }

  // get a form with answers
  public static function get_form_with_answers(string $id): array
  {
    $connection = Database::get_instance()->get_connection();

    $sql =
      "SELECT
      Field.id AS field_id,
      Field.name AS field_name,
      Field_Type.name AS field_type, Field_Type.id AS type_id,
      Answer.id AS answer_id, Answer.answer AS answer_value
    FROM Form
      JOIN Field ON Form.id = Field.form_id
      JOIN Field_Type ON Field.type_id = Field_Type.id
      LEFT JOIN Answer ON Field.id = Answer.field_id
    WHERE Form.id =:id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $data = [];

    // group by field_id and add the answers to the field

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $field_id = $row['field_id'];
      if (!array_key_exists($field_id, $data)) {
        $data[$field_id] = [
          'id' => $field_id,
          'name' => $row['field_name'],
          'type' => [
            'id' => $row['type_id'],
            'name' => $row['field_type']
          ],
          'answers' => []
        ];
      }

      // if the answer_id is not null, add the answer to the field
      if ($row['answer_id']) {
        $data[$field_id]['answers'][] = [
          'id' => $row['answer_id'],
          'value' => $row['answer_value']
        ];
      }
    }

    // Convert associative array to indexed array
    $answers = array_values($data);

    return $answers;
  }

  public static function get_fields(string $id): array
  {

    $connection = Database::get_instance()->get_connection();
    $sql = 'SELECT Field.id as field_id, 
       Field.name as field_name,
       Field.is_required as is_required,
       Field_Type.id as type_id, Field_Type.name as type_name,
       `Option`.id as option_id, `Option`.value as option_value
            FROM Form
            JOIN Field ON Form.id = Field.form_id
            JOIN Field_Type ON Field.type_id = Field_Type.id
            LEFT JOIN `Option` ON Field.id = `Option`.field_id
            WHERE Form.id = :id';

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $data = [];


    // group the fields by their id and add the options to the field

    // make it follow this example: [fields: [{field_data}, {field_data}, ...]]
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $field_id = $row['field_id'];
      if (!array_key_exists($field_id, $data)) {
        $data[$field_id] = [
          'id' => $field_id,
          'name' => $row['field_name'],
          'is_required' => $row['is_required'],
          'type' => [
            'id' => $row['type_id'],
            'name' => $row['type_name']
          ],
          'options' => []
        ];
      }
      if ($row['option_id']) {
        $data[$field_id]['options'][] = [
          'id' => $row['option_id'],
          'value' => $row['option_value']
        ];
      }

    }

    // Convert associative array to indexed array
    $fields = array_values($data);

    return $fields;
  }


  public static function get_submissions(string $id): array
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "SELECT form_id, field_name, answer
            FROM Submission
            JOIN Answer ON Submission.id = Answer.submission_id
            JOIN Field ON Answer.field_id = Field.id
            WHERE form_id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $data[] = $row;
    }

    return $data;
  }


  public static function get_map_results_by_id(int $id): array|false
  {
    $connection = Database::get_instance()->get_connection();

    $sql =
      "SELECT
          Submission.id AS submission_id,
          Field.id AS field_id,
          Field.name AS field_name,
          Answer.answer AS answer,
          Map_Coordinates.latitude AS latitude,
          Map_Coordinates.longitude AS longitude
      FROM
          Submission
          JOIN Form ON Submission.form_id = Form.id
          JOIN Field ON Form.id = Field.form_id
          LEFT JOIN Answer ON Submission.id = Answer.submission_id
          AND Field.id = Answer.field_id
          LEFT JOIN Map_Coordinates ON Submission.id = Map_Coordinates.submission_id
          AND Field.id = Map_Coordinates.field_id
      WHERE
          Form.id = :id;";

    $stmt = $connection->prepare($sql);

    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->execute();

    $data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $submission_id = $row['submission_id'];
      if (!array_key_exists($submission_id, $data)) {
        $data[$submission_id] = [
          'submission_id' => $submission_id,
          'fields' => []
        ];
      }

      $entry = [
        'field_id' => $row['field_id'],
        'field_name' => $row['field_name']
      ];

      if (!is_null($row['answer'])) {
        $entry['answer'] = $row['answer'];
      }

      if (!is_null($row['latitude']) && !is_null($row['longitude'])) {
        $entry['answer'] = $row['latitude'] . ',' . $row['longitude'];
      }

      $data[$submission_id]['fields'][] = $entry;
      $data[$submission_id]["position"] = [
        (float) $row['latitude'],
        (float) $row['longitude']
      ];
    }

    // Convert associative array to indexed array
    $data = array_values($data);

    return $data;
  }

  public function create(): string
  {
    $this->connection = Database::get_instance()->get_connection();

    $sql = "INSERT INTO Form (name, description, is_visible) 
            VALUES (:name, :description, :is_visible)";

    $stmt = $this->connection->prepare($sql);

    $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
    $stmt->bindParam(':description', $this->description, PDO::PARAM_STR);
    $stmt->bindParam(':is_visible', $this->is_visible, PDO::PARAM_BOOL);

    $stmt->execute();

    $this->id = $this->connection->lastInsertId();

    foreach ($this->fields as $field) {
      // this->id is the new form id
      $field->create($this->id);
    }

    return $this->id;
  }

  // pending: read, update, delete

  public static function read(string $id): array|false
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "SELECT * FROM Form
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return $data;
  }

  public static function update(array $data): array|false
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "UPDATE Form SET name = :name, 
    description = :description, 
    is_visible = :is_visible WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':is_visible', $data['is_visible']);
    $stmt->bindParam(':id', $data['id']);

    if ($stmt->execute()) {
      return $data;
    } else {
      return false;
    }
  }

  public static function delete(string $id): int
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "DELETE FROM Form 
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->rowCount();
  }

  public static function search_by_code(string $code){
    $connection = Database::get_instance()->get_connection();

    $sql = "SELECT id FROM Form
            WHERE code = :code";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':code', $code, PDO::PARAM_STR);
    $stmt->execute();

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return $data;
  }

}