import Text from './questions/Text';
import List from './questions/List';



const Question = ({ type, name, is_required, options }) => {
  return (
    <>
      <input type_id={type} name='question-name' type="text" placeholder='Pregunta' defaultValue={name ? name : ''} ></input>
      {
        (type === 1 || type === 2)
          ? <Text option={type} />
          : (type === 3 || type === 4)
            ? <List type={type} optionsList={options} />
            : <div>Mapa</div>
      }      
      <div style={{display:"flex", alignContent: "center"}}>
        <label htmlFor='required'>¿Obligatoria?</label>
        <input id='required' name='required' type='checkbox' defaultChecked={is_required}></input>
      </div>
    </>
  )
}

export default Question;
