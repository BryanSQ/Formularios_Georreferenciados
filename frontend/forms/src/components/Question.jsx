import Text from './questions/Text';
import List from './questions/List';



const Question = ({ type, name }) => {
  return (
    <>
      <input type_id={type} name='question-name' type="text" placeholder='Pregunta' value={name ? name : ''}></input>
      {
        (type === 1 || type === 2)
          ? <Text option={type} />
          : (type === 3 || type === 4)
            ? <List type={type} />
            : <div>Mapa</div>
      }      
      <div style={{display:"flex", alignContent: "center"}}>
        <label htmlFor='required'>¿Obligatoria?</label>
        <input id='required' name='required' type='checkbox'></input>
      </div>
    </>
  )
}

export default Question;
