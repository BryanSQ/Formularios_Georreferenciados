INSERT INTO Field_Type(name) VALUES('short'); -- id:1
INSERT INTO Field_Type(name) VALUES('long'); -- id:2
INSERT INTO Field_Type(name) VALUES('checkbox'); -- id:3
INSERT INTO Field_Type(name) VALUES('select'); -- id:4
INSERT INTO Field_Type(name) VALUES('map'); -- id:5

INSERT INTO Form(name, description, is_visible) VALUES('Formulario de Prueba 2', 'Formulario de Prueba 2', false);

INSERT INTO Field(form_id, type_id, name, is_required) VALUES(1, 1, 'Nombre', true);
INSERT INTO Field(form_id, type_id, name, is_required) VALUES(1, 1, 'Apellido', true);
INSERT INTO Field(form_id, type_id, name, is_required) VALUES(1, 4, 'Es mayor de edad?', true);
INSERT INTO Field(form_id, type_id, name, is_required) VALUES(1, 5, 'Rango', true);

INSERT INTO Field(form_id, type_id, name, is_required) VALUES(1, 5, 'Ubicacion', true);

INSERT INTO `Option`(field_id, value) VALUES(3, 'Si');
INSERT INTO `Option`(field_id, value) VALUES(3, 'No');

INSERT INTO `Option`(field_id, value) VALUES(4, 'Bajo');
INSERT INTO `Option`(field_id, value) VALUES(4, 'Medio');
INSERT INTO `Option`(field_id, value) VALUES(4, 'Alto');

INSERT INTO Answer(field_id, answer) VALUES(1, 'Juan');
INSERT INTO Answer(field_id, answer) VALUES(1, 'Pedro');
INSERT INTO Answer(field_id, answer) VALUES(1, 'Pablo');
INSERT INTO Answer(field_id, answer) VALUES(2, 'Gomez');

INSERT INTO Answer(field_id, answer) VALUES(5, '9.6301892, -84.2541844');
INSERT INTO Answer(field_id, answer) VALUES(5, '9.6301892, -83.2582374');
