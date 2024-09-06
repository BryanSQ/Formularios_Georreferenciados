import Text from './questions/Text';
import List from './questions/List';

const Question = (
  { type, 
    id,
    questions,  
    handleDelete, 
    handleChangeName, 
    options, 
    addOption, 
    handleChangeOptions, 
    removeOption,
    handleIsRequiredChange 
  }) => {

  let question;
  switch (type) {
    case 'short':
      question = <Text option="corta"></Text>
      break;
    case 'long':
      question = <Text option="larga"></Text>
      break;
    case 'select':
      question = <List
        id={id}
        options={options}
        addOption={addOption}
        handleChangeOptions={handleChangeOptions}
        removeOption={removeOption}></List>
      break;
    case 'checkbox':
      question = <List
        id={id}
        options={options}
        addOption={addOption}
        handleChangeOptions={handleChangeOptions}
        removeOption={removeOption}></List>
      break;
    case 'map':
      question = (
        <div>
          <p>Visualización de mapa</p>
        </div>
      )
      break;
    default:
      break;
  }
  return (
    <>
      <input type="text" placeholder='Pregunta' onChange={(e) => handleChangeName(id, e.target.value)}></input>
      {question}
      <button onClick={() => handleDelete(id)}>Eliminar pregunta</button>
      <button onClick={() => handleIsRequiredChange(id)}>
        Obligatoria:
        {questions[id].isRequired ? ' Sí' : ' No'}
        </button>
      
    </>
  )
}

export default Question;