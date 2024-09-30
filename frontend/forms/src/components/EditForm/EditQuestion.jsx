import React from 'react';
import EditList from "./EditList";

const EditQuestion = ({ type, name, options }) => {
  const renderInputField = () => {
    switch (type) {
      case 1:
        return <div className='question-box-body'><input type="text" placeholder={"Texto de respuesta corto"} disabled></input></div>
      case 2:
        return <div className='question-box-body'><input type="text" placeholder={"Texto de respuesta larga"} disabled></input></div>
      case 3:
      case 4:
        return <EditList type={type} optionList={options} />;
      default:
        return <div className='question-box-body'>Mapa</div>;
    }
  };

  return (
    <>
      <div className='question-box-header'>
        <input id='question-name' type_id={type} type="text" name="question-name" placeholder="Pregunta" defaultValue={name || ''} />
      </div>
      {
        renderInputField()
      }
    </>
  );
};

export default EditQuestion;