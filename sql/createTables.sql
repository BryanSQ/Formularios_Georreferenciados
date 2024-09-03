CREATE DATABASE IF NOT EXISTS formsSystem;

USE formsSystem;
CREATE TABLE User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_created_by FOREIGN KEY (created_by) REFERENCES User(id),
    CONSTRAINT fk_user_updated_by FOREIGN KEY (updated_by) REFERENCES User(id)
);

CREATE TABLE Form(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    code VARCHAR(6) NOT NULL UNIQUE,
    is_visible BOOLEAN,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_form_created_by FOREIGN KEY (created_by) REFERENCES User(id),
    CONSTRAINT fk_form_updated_by FOREIGN KEY (updated_by) REFERENCES User(id)
);

CREATE TABLE Field_Type(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_field_type_created_by FOREIGN KEY (created_by) REFERENCES User(id),
    CONSTRAINT fk_field_type_updated_by FOREIGN KEY (updated_by) REFERENCES User(id)
);

CREATE TABLE Field(
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT NOT NULL,
    type_id INT NOT NULL,
    name TEXT NOT NULL,
    is_required BOOLEAN,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_field_form_id FOREIGN KEY (form_id) REFERENCES Form(id),
    CONSTRAINT fk_field_field_type_id FOREIGN KEY (type_id) REFERENCES Field_Type(id),
    CONSTRAINT fk_field_created_by FOREIGN KEY (created_by) REFERENCES User(id),
    CONSTRAINT fk_field_updated_by FOREIGN KEY (updated_by) REFERENCES User(id)
);

CREATE TABLE Answer(
    id INT AUTO_INCREMENT PRIMARY KEY,
    field_id INT,
    answer TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_answer_field_id FOREIGN KEY (field_id) REFERENCES Field(id),
    CONSTRAINT fk_answer_created_by FOREIGN KEY (created_by) REFERENCES User(id),
    CONSTRAINT fk_answer_updated_by FOREIGN KEY (updated_by) REFERENCES User(id)
);

CREATE TABLE `Option`(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    field_id int NOT NULL,
    value VARCHAR(255),
    CONSTRAINT fk_option_field_id FOREIGN KEY (field_id) REFERENCES Field(id)
);