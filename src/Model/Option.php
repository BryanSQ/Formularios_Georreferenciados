<?php

class Option{
  private $id;
  private $field_id;
  private $value;
  private $connection;

  public function __construct($value){
    $this->value = $value;
    $this->connection = Database::get_instance()->get_connection();
  }

  public static function get_from_field( $field_id )
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "SELECT * FROM Option
            WHERE field_id = :field_id";
    
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':field_id', $field_id, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
  }


  public function create(int $field_id): string
  {
    $sql = "INSERT INTO `Option` (field_id, value)
            VALUES (:field_id, :value)";
    
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':field_id', $field_id, PDO::PARAM_INT);
    $stmt->bindParam(':value', $this->value, PDO::PARAM_STR);
    
    $stmt->execute();
    
    $this->id = $this->connection->lastInsertId();
    
    return $this->id;
  }

  public static function read($id): array | false
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "SELECT * FROM Option
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return $data;
  }

  public static function update(array $data): array | false
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "UPDATE `Option` 
            SET field_id = :field_id, value = :value
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':field_id', $data['field_id'], PDO::PARAM_INT);
    $stmt->bindParam(':value', $data['value'], PDO::PARAM_STR);
    $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);

    if ($stmt->execute()) {
      return $data;
    } else {
      return false;
    }
  }

  public static function update_value(string $id, string $value): bool
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "UPDATE Option
            SET value = :value
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':value', $value, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt->rowCount() > 0;
  }

  public static function delete($id): bool
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "DELETE FROM Option
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    $stmt->execute();

    return true;
  }


}