<?php

class User{
  private int $id;
  private string $email;
  private string $password;
  private PDO $connection;

  public function __construct()
  {
      $this->connection = Database::get_instance()->get_connection();
  }

  public function get_all()
  { 
      // change * to the column names when the table is created
      $sql = "SELECT * FROM users";
      $stmt = $this->connection->query($sql);

      $data = [];
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          $data[] = $row;
      }
      return $data;      
  }

  public function create(array $data): string 
  {
    $sql = "INSERT INTO users (email, password) 
            VALUES (:email, :password)";
            
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':email', $data["user"], PDO::PARAM_STR);

    // hash the password later
    $stmt->bindParam(':password', $data["password"], PDO::PARAM_STR);

    $stmt->execute();


    return $this->connection->lastInsertId();
  }

  public function read(string $id): array | false 
  {
    $sql = "SELECT * FROM users
            WHERE id = :id";

    $stmt = $this->connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function update(array $current, array $new): int
  {
    $sql = 'UPDATE users
            SET email = :email, password = :password
            WHERE id = :id';
    $stmt = $this->connection->prepare($sql);

    $email = $new["email"] ?? $current["email"];
    $password = $new["password"] ?? $current["password"];

    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    $stmt->bindParam(':id', $current['id'], PDO::PARAM_INT);

    $stmt->execute();
    return $stmt->rowCount();
  }

  public function delete(string $id): int
  {
    $sql = 'DELETE FROM users
            WHERE id = :id';
    $stmt = $this->connection->prepare($sql);

    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
  }

}