<?php

class FieldType{
  private int $id;
  private string $name;
  private PDO $connection;

  public function __construct(string $name){
    $this->name = $name;
    $this->connection = Database::get_instance()->get_connection();
  }

  static function get_id_by_name(string $name){
    $connection = Database::get_instance()->get_connection();
    $sql = "SELECT id FROM Field_Type WHERE name = :name";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(":name", $name, PDO::PARAM_STR);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row["id"];
  }

  static function get_all(){
    $connection = Database::get_instance()->get_connection();
    $sql = "SELECT * FROM Field_Type";
    $stmt = $connection->prepare($sql);
    $stmt->execute();

    $field_types = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      // get id and name from the row
      $field_types[] = [
        "id" => $row["id"],
        "name" => $row["name"]
      ];
    }

    return $field_types;
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