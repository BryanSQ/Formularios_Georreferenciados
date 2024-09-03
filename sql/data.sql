INSERT INTO Field_Type(name) VALUES('Texto');

INSERT INTO Form(name, description, is_visible) VALUES('Formulario de Prueba 2', 'Formulario de Prueba 2', false);

INSERT INTO Field(form_id, type_id, name, is_required) VALUES(1, 1, 'Nombre', true);
INSERT INTO Field(form_id, type_id, name, is_required) VALUES(1, 1, 'Apellido', true);

INSERT INTO Answer(field_id, answer) VALUES(1, 'Juan');
INSERT INTO Answer(field_id, answer) VALUES(1, 'Pedro');
INSERT INTO Answer(field_id, answer) VALUES(1, 'Pablo');
INSERT INTO Answer(field_id, answer) VALUES(2, 'Gomez');