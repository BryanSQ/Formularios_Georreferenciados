USE formsSystem;

CREATE TABLE IF NOT EXISTS Submission(
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_submission_form_id FOREIGN KEY (form_id) REFERENCES Form(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Map_Coordinates(
    id INT AUTO_INCREMENT PRIMARY KEY,
    field_id INT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    CONSTRAINT fk_map_coordinates_field_id FOREIGN KEY (field_id) REFERENCES Field(id) ON DELETE CASCADE
);

ALTER TABLE Answer ADD COLUMN submission_id INT;
ALTER TABLE Answer ADD CONSTRAINT fk_answer_submission_id FOREIGN KEY (submission_id) REFERENCES Submission(id) ON DELETE CASCADE;

ALTER TABLE `Map_Coordinates` ADD COLUMN submission_id INT;
ALTER TABLE `Map_Coordinates` ADD CONSTRAINT fk_map_coordinates_submission_id FOREIGN KEY (submission_id) REFERENCES Submission(id) ON DELETE CASCADE