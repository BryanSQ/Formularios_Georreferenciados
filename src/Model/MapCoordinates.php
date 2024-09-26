<?php

class MapCoordinates{
  private int $id;
  private int $field_id;
  private int $submission_id;
  private $latitude;
  private $longitude;
  private PDO $connection;


  public function __construct(int $field, int $submission, $lat, $lng){
    $this->field_id = $field;
    $this->submission_id = $submission;
    $this->latitude = $lat;
    $this->longitude = $lng;
    $this->connection = Database::get_instance()->get_connection();
  }


  public function create(): string
  {
    $sql = "INSERT INTO Map_Coordinates (field_id, submission_id, latitude, longitude) 
            VALUES (:field_id, :submission_id, :latitude, :longitude)";
            
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':field_id', $this->field_id, PDO::PARAM_INT);
    $stmt->bindParam(':submission_id', $this->submission_id, PDO::PARAM_INT);
    $stmt->bindParam(':latitude', $this->latitude, PDO::PARAM_STR);
    $stmt->bindParam(':longitude', $this->longitude, PDO::PARAM_STR);

    $stmt->execute();

    $this->id = $this->connection->lastInsertId();

    return $this->id;
  }

}