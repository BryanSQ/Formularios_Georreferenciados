<?php

class Field{
  private int $id;
  private string $name;
  private bool $is_required;
  private int $type_id;
  private int $form_id;
  private array $answers = [];

  private PDO $connection;

  public function __construct(string $name, bool $is_required, int $type){
    $this->name = $name;
    $this->is_required = $is_required;
    $this->type_id = $type;
    $this->connection = Database::get_instance()->get_connection();
  }

  public function add_answer(Answer $answer)
  {
    $this->answers[] = $answer;
  }

  public function get_id(): int
  {
    return $this->id;
  }

  public function create(int $form_id): string
  {
    $sql = "INSERT INTO Field (name, is_required, type, form_id) 
            VALUES (:name, :is_required, :type_id, :form_id)";
            
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
    $stmt->bindParam(':is_required', $this->is_required, PDO::PARAM_BOOL);
    $stmt->bindParam(':type_id', $this->type_id, PDO::PARAM_INT);
    $stmt->bindParam(':form_id', $form_id, PDO::PARAM_INT);

    $stmt->execute();

    $this->id = $this->connection->lastInsertId();

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


}