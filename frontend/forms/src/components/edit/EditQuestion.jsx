import React from 'react';
import EditList from "./EditList";

const EditQuestion = ({ type, name, is_required, options }) => {
  const renderInputField = () => {
    switch (type) {
      case 1:
        return <input type="text" placeholder={"Texto de respuesta corto"} disabled></input>
      case 2:
        return <input type="text" placeholder={"Texto de respuesta larga"} disabled></input>
      case 3:
      case 4:
        return <EditList type={type} optionList={options} />;
      default:
        return <div>Mapa</div>;
    }
  };

  return (
    <>
      <input
        type="text"
        name="question-name"
        placeholder="Pregunta"
        defaultValue={name || ''}
      />
      {renderInputField()}
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="required">¿Obligatoria?</label>
        <input
          id="required"
          name="required"
          type="checkbox"
          defaultChecked={is_required}
        />
      </div>
    </>
  );
};

export default EditQuestion;