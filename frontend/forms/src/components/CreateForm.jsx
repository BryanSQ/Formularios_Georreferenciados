import { useState, useEffect } from 'react';
import Question from './Question';

function CreateForm() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('short');

  const handleSelectChange = (value) => {
    setSelectedQuestion(value);
    addQuestion(value);
  }

  const handleAddQuestionClick = () => {
    addQuestion(selectedQuestion);
    
  }

  const addQuestion = (type) => {
    if (type === "dropdown" || type === "checkbox") {
      setQuestions([...questions, {
        type: type,
        name: "",
        options: []
      }]);
    }
    else {
      setQuestions([...questions, {
        type: type,
        name: ""
      }]);
    }
  }

  const handleChangeName = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].name = value;
    setQuestions(newQuestions);
  }

  const addOption = (index) => {
    const newQuestions = [...questions];
    const newOptions = [...newQuestions[index].options];
    newOptions.push('');
    newQuestions[index].options = newOptions;
    setQuestions(newQuestions);
  }

  const handleChangeOptions = (index, optionIndex, event) => {
    const newQuestions = [...questions];
    const newOptions = [...newQuestions[index].options];
    newOptions[optionIndex] = event.target.value;
    newQuestions[index].options = newOptions;
    setQuestions(newQuestions);
  }

  const removeOption = (index, optionIndex) => {
    const newQuestions = [...questions];
    const newOptions = newQuestions[index].options.filter((_, i) => i !== optionIndex);
    newQuestions[index].options = newOptions;
    setQuestions(newQuestions);
  }

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  }

  const handleSubmit = () => {
    console.log(questions);
  }

  return (
    <div>
      <h1>Crear un formulario</h1>

      <div>
        <h3>Título del formulario:</h3>
        <input type="text"></input>
        <p>Descripción:</p>
        <input type="text"></input>
      </div>

      <div>
        <h3>Agregar pregunta</h3>
        <select value={selectedQuestion}
          onChange={(e) => handleSelectChange(e.target.value)}>
          <option value="short">Respuesta corta</option>
          <option value="long">Párrafo</option>
          <option value="dropdown">Desplegable</option>
          <option value="checkbox">Casilla de verificación</option>
          <option value="map">Mapa</option>
        </select>
        <button onClick={handleAddQuestionClick}>Agregar</button>
      </div>

      <div>
        <h3>Preguntas</h3>
        {questions.map((question, index) => {
          return (
            <div key={index}>
              <Question
                type={question.type}
                id={index}
                handleDelete={handleDeleteQuestion}
                handleChangeName={handleChangeName}
                options={question.options}
                addOption={addOption}
                handleChangeOptions={handleChangeOptions}
                removeOption={removeOption}></Question>
            </div>
          )
        })}
      </div>

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default CreateForm;