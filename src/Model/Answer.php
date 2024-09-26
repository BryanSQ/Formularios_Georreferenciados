<?php

class Answer {
  private int $id;
  private int $field_id;
  private int $submission_id;
  private string $answer;

  private PDO $connection;

  public function __construct(int $field_id, int $submission, string $answer){
    $this->field_id = $field_id;
    $this->answer = $answer;
    $this->submission_id = $submission;
    $this->connection = Database::get_instance()->get_connection();
  }

  public function create(): string
  {
    $sql = "INSERT INTO Answer (field_id, submission_id, answer)
            VALUES (:field_id, :submission_id, :answer)";
            
    $stmt = $this->connection->prepare($sql);
    
    $stmt->bindParam(':field_id', $this->field_id, PDO::PARAM_INT);
    $stmt->bindParam(':submission_id', $this->submission_id, PDO::PARAM_INT);
    $stmt->bindParam(':answer', $this->answer, PDO::PARAM_STR);

    $stmt->execute();

    $this->id = $this->connection->lastInsertId();

    return $this->id;
  }




}




// CREATE TABLE Answer(
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   field_id INT,
//   answer VARCHAR(300),
//   created_by INT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_by INT,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   CONSTRAINT fk_answer_field_id FOREIGN KEY (field_id) REFERENCES Field(id),
//   CONSTRAINT fk_answer_created_by FOREIGN KEY (created_by) REFERENCES User(id),
//   CONSTRAINT fk_answer_updated_by FOREIGN KEY (updated_by) REFERENCES User(id)
// );