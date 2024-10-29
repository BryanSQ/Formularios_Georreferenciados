<?php

class Submission{
  private int $id;
  private int $form_id;
  private PDO $connection;

  public function __construct(int $form_id){    
    $this->form_id = $form_id;
    $this->connection = Database::get_instance()->get_connection();
  }

  public function create(): string
  {
    $connection = Database::get_instance()->get_connection();
    $sql = "INSERT INTO Submission (form_id) 
            VALUES (:form_id)";
            
    $stmt = $connection->prepare($sql);
    
    $stmt->bindParam(':form_id', $this->form_id, PDO::PARAM_INT);

    $stmt->execute();

    $this->id = $connection->lastInsertId();

    return $this->id;
  }

  public static function read(string $id): array
  {
    $connection = Database::get_instance()->get_connection();
    $sql = "SELECT * FROM Submission WHERE id = :id";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $submission = $stmt->fetch(PDO::FETCH_ASSOC);
    return $submission;
  }


  public static function delete(string $id): int
  {
    $connection = Database::get_instance()->get_connection();

    $sql = "DELETE FROM Submission WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->rowCount();
  }

}