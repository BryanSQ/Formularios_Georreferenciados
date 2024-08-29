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