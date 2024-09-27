import List from './List';

const Question = ({ type }) => {

  const renderInputField = () => {
    switch (type) {
      case 1:
        return <input type="text" placeholder={"Texto de respuesta corta"} disabled></input>
      case 2:
        return <input type="text" placeholder={"Texto de respuesta larga"} disabled></input>
      case 3:
      case 4:
        return <List type={type} />;
      default:
        return <div>Mapa</div>;
    }
  };



  return (
    <>
      <div className='field-data'>
        <input id='question-name' type_id={type} name='question-name' type="text" placeholder='Pregunta' ></input>
        {
          renderInputField()
        }
      </div>

      <div className='field-config'>

        <select></select>

        <label htmlFor='required'>¿Obligatoria?</label>
        <input id='required' name='required' type='checkbox' />
      </div>
    </>
  )
}

export default Question;
