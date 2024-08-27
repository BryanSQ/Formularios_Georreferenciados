<?php

class FieldType{
  private int $id;
  private string $name;
  private PDO $connection;

  public function __construct(string $name){
    $this->name = $name;
    $this->connection = Database::get_instance()->get_connection();
  }

  public function create(): string
  {
    $sql = "INSERT INTO field_types (name) 
            VALUES (:name)";
            
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);

    $stmt->execute();

    $this->id = $this->connection->lastInsertId();
    
    return $this->id;
  }



}