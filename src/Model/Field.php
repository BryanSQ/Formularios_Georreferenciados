<?php

class Field{
  private int $id;
  private string $name;
  private bool $is_required;
  private int $type_id;

  private PDO $connection;

  public function __construct(string $name, bool $is_required, int $type){
    $this->name = $name;
    $this->is_required = $is_required;
    $this->type_id = $type;
    $this->connection = Database::get_instance()->get_connection();
  }


  public function create(int $form_id): string
  {
    $sql = "INSERT INTO fields (name, is_required, type, form_id) 
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

}