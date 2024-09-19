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
    CONSTRAINT fk_field_form_id FOREIGN KEY (form_id) REFERENCES Form(id) ON DELETE CASCADE,
    CONSTRAINT fk_field_field_type_id FOREIGN KEY (type_id) REFERENCES Field_Type(id) ON DELETE CASCADE,
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
    CONSTRAINT fk_answer_field_id FOREIGN KEY (field_id) REFERENCES Field(id) ON DELETE CASCADE,
    CONSTRAINT fk_answer_created_by FOREIGN KEY (created_by) REFERENCES User(id),
    CONSTRAINT fk_answer_updated_by FOREIGN KEY (updated_by) REFERENCES User(id)
);

CREATE TABLE `Option`(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    field_id int NOT NULL,
    value VARCHAR(255),
    CONSTRAINT fk_option_field_id FOREIGN KEY (field_id) REFERENCES Field(id) ON DELETE CASCADE
);

DELIMITER //

CREATE FUNCTION generate_code()
RETURNS CHAR(6)
DETERMINISTIC
BEGIN
    DECLARE chars CHAR(62) DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    DECLARE result CHAR(6) DEFAULT '';
    DECLARE i INT DEFAULT 0;
    WHILE i < 6 DO
        SET result = CONCAT(result, SUBSTRING(chars, FLOOR(1 + RAND() * 62), 1));
        SET i = i + 1;
    END WHILE;
    RETURN result;
END //

DELIMITER ;

DROP TRIGGER IF EXISTS set_code_in_form;
DELIMITER //

CREATE TRIGGER set_code_in_form
BEFORE INSERT ON Form
FOR EACH ROW
BEGIN
    SET NEW.code = generate_code();
    -- Verificar que el valor generado sea único
    WHILE EXISTS (SELECT 1 FROM Form WHERE code = NEW.code) DO
        SET NEW.code = generate_code();
    END WHILE;
END //

DELIMITER ;


INSERT INTO Field_Type(name) VALUES('short'); -- id:1
INSERT INTO Field_Type(name) VALUES('long'); -- id:2
INSERT INTO Field_Type(name) VALUES('checkbox'); -- id:3
INSERT INTO Field_Type(name) VALUES('select'); -- id:4
INSERT INTO Field_Type(name) VALUES('map'); -- id:5