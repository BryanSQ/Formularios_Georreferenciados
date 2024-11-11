<?php

class Log{
  private PDO $connection;
  public function __construct(){
    $this->connection = Database::get_instance()->get_connection();
  }

  public function create($user_id, $action):bool{
    $sql = "INSERT INTO FormsLog (user_id, action) VALUES (:user_id, :action)";
    $stmt = $this->connection->prepare($sql);
    return $stmt->execute([
      'user_id' => $user_id,
      'action' => $action,
    ]);
  }

  public function read($id):array|false{
    $sql = "SELECT * FROM FormsLog WHERE id = :id";
    $stmt = $this->connection->prepare($sql);
    $stmt->execute(['id' => $id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public static function read_all():array|false{
    $connection = Database::get_instance()->get_connection();
    $sql = "SELECT * FROM FormsLog";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}