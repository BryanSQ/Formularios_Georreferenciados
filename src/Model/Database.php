<?php

class Database {
  private static ?Database $instance = null;
  private PDO $connection;

  private function __construct() {
    $config = require 'config.php';
    $dsn = $config['dsn'];
    $username = $config['username'];
    $password = $config['password'];
    $this->connection = new PDO($dsn, $username, $password);
    $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public static function get_instance(): Database {
    if (self::$instance === null) {
      self::$instance = new Database();
    }
    return self::$instance;
  }

  public function get_connection(): PDO {
    return $this->connection;
  }
}