import List from './List';

const Question = ({ type }) => {

  const renderInputField = () => {
    switch (type) {
      case 1:
        return <input type="text" placeholder={"Texto de respuesta corto"} disabled></input>
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
      <input type_id={type} name='question-name' type="text" placeholder='Pregunta' ></input>
      {
        renderInputField()
      }      
      <div style={{display:"flex", alignContent: "center"}}>
        <label htmlFor='required'>¿Obligatoria?</label>
        <input id='required' name='required' type='checkbox' ></input>
      </div>
    </>
  )
}

export default Question;
