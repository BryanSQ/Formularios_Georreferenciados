<?php

class Field {
  private int $id;
  private string $name;
  private bool $is_required;
  private int $type_id;
  private int $form_id;
  private array $answers = [];

  private array $options = [];

  private PDO $connection;

  public function __construct(string $name, bool $is_required, int $type_id){
    $this->name = $name;
    $this->is_required = $is_required;
    $this->type_id = $type_id;
    $this->connection = Database::get_instance()->get_connection();
  }

  public function add_answer(Answer $answer)
  {
    $this->answers[] = $answer;
  }

  public function add_option(Option $option)
  {
    $this->options[] = $option;
  }

  public function get_id(): int
  {
    return $this->id;
  }

  public function create(int $form_id): string
  {
    $sql = "INSERT INTO Field (name, is_required, type_id, form_id) 
            VALUES (:name, :is_required, :type_id, :form_id)";
            
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
    $stmt->bindParam(':is_required', $this->is_required, PDO::PARAM_BOOL);
    $stmt->bindParam(':type_id', $this->type_id, PDO::PARAM_INT);
    $stmt->bindParam(':form_id', $form_id, PDO::PARAM_INT);

    $stmt->execute();

    $this->id = $this->connection->lastInsertId();

    foreach ($this->options as $option) {
      $option->create($this->id);
    }

    return $this->id;
  }


  public static function read(int $id): array | false
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "SELECT * FROM Field
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return $data;
  }

  public static function update(array $data): array | false {
    $connection = Database::get_instance()->get_connection();

    $sql = "UPDATE Field SET name = :name, 
    is_required = :is_required, 
    type_id = :type_id WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':is_required', $data['is_required']);
    $stmt->bindParam(':type_id', $data['type_id']);
    $stmt->bindParam(':id', $data['id']);

    if ($stmt->execute()) {
        return $data;
    } else {
        return false;
    }
  }

  public static function get_maps(): array | false{
    $connection = Database::get_instance()->get_connection();

    $map_id_query = 'SELECT id FROM Field_Type
            WHERE name = "map" OR name = "MAP"';

    // query only fields with map type
    $sql = "SELECT Answer.answer as answer, Field.name as field_name
        FROM Field
        JOIN Answer ON Field.id = Answer.field_id
        WHERE Field.type_id = ({$map_id_query})";

    $stmt = $connection->prepare($sql);
    $stmt->execute();

    $data = [];
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      $data[] = $row;
    }
    return $data;
  }
}