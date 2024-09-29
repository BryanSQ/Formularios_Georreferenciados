import { useState } from 'react';
import List from './List';
import TypeSelect from '../helper/TypeSelect';

const Question = () => {

  const [type, setType] = useState(1);

  const changeType = (value) => {
    setType(parseInt(value));
  }

  const renderInputField = () => {
    switch (type) {
      case 1:
        return <div className='question-box-body'><input type="text" placeholder={"Texto de respuesta corta"} disabled></input></div>
      case 2:
        return <div className='question-box-body'><input type="text" placeholder={"Texto de respuesta larga"} disabled></input></div>
      case 3:
      case 4:
        return <List type={type} />;
      default:
        return <div className='question-box-body'>Mapa</div>;
    }
  };


  return (
    <>
      <div className='question-box-header'>
        <input id='question-name' type_id={type} name='question-name' type="text" placeholder='Pregunta' ></input>
        <TypeSelect handleChange={changeType} />
      </div>

      {
        renderInputField()
      }
    </>
  )
}

export default Question;
