import Text from './questions/Text';
import List from './questions/List';

const Question = ({ type }) => {
  return (
    <>
      <input type_id={type} name='question-name' type="text" placeholder='Pregunta'></input>
      {
        (type === '1' || type === '2')
          ? <Text option={type === '1' ? "corta" : "larga"} />
          : <List type={type} />
      }

      <div style={{display:"flex", alignContent: "center"}}>
        <label htmlFor='required'>¿Obligatoria?</label>
        <input id='required' name='required' type='checkbox'></input>
      </div>
    </>
  )
}

export default Question;