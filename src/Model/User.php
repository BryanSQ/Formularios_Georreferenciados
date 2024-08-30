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

  public static function get_all()
  {       
      $connection = Database::get_instance()->get_connection();

      $sql = "SELECT id, email, password FROM users";
      $stmt = $connection->query($sql);

      $data = [];
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          $data[] = $row;
      }
      return $data;      
  }

  public function create(): string 
  {
    $sql = "INSERT INTO users (email, password) 
            VALUES (:email, :password)";
            
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':email', $this->email, PDO::PARAM_STR);

    // hash the password later
    $stmt->bindParam(':password', $this->password, PDO::PARAM_STR);

    $stmt->execute();


    return $this->connection->lastInsertId();
  }

  public static function read(string $id): array | false 
  {

    $connection = Database::get_instance()->get_connection();

    $sql = "SELECT * FROM users
            WHERE id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function update(array $data): int
  {
    $sql = 'UPDATE users
            SET email = :email, password = :password
            WHERE id = :id';
    $stmt = $this->connection->prepare($sql);

    $stmt->bindParam(':email', $data["email"], PDO::PARAM_STR);
    $stmt->bindParam(':password', $data["password"], PDO::PARAM_STR);
    $stmt->bindParam(':id', $data["id"], PDO::PARAM_INT);

    $stmt->execute();
    return $stmt->rowCount();
  }

  public static function delete(string $id): int
  {
    $connection = Database::get_instance()->get_connection();

    $sql = 'DELETE FROM users
            WHERE id = :id';
    $stmt = $connection->prepare($sql);

    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
  }

  public static function login(string $email, string $password): bool
  {
    $connection = Database::get_instance()->get_connection();
    $sql = 'SELECT id FROM User
            WHERE email = :email AND password = :password';
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    $stmt->execute();

    return $stmt->rowCount() > 0;
  }

}