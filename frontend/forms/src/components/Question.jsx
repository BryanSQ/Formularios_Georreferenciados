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
    case '1':
      question = <Text option="corta"></Text>
      break;
    case '2':
      question = <Text option="larga"></Text>
      break;
    case '4':
      question = <List
        id={id}
        options={options}
        addOption={addOption}
        handleChangeOptions={handleChangeOptions}
        removeOption={removeOption}></List>
      break;
    case '3':
      question = <List
        id={id}
        options={options}
        addOption={addOption}
        handleChangeOptions={handleChangeOptions}
        removeOption={removeOption}></List>
      break;
    case '5':
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
      <input type="text" value={questions[id].name || ''} placeholder='Pregunta' onChange={(e) => handleChangeName(id, e.target.value)}></input>
      {question}
      <button onClick={() => handleDelete(id)}>Eliminar pregunta</button>
      <button onClick={() => handleIsRequiredChange(id)}>
        Obligatoria:
        {questions[id].is_required ? ' Sí' : ' No'}
        </button>
      
    </>
  )
}

export default Question;