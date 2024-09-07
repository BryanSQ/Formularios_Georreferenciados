import { useState, useEffect } from 'react';
import Question from './Question';
import './styles/CreateForm.css';

function CreateForm() {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('short');
  const [isRequired, setIsRequired] = useState(false);

  const handleSelectChange = (value) => {
    setSelectedQuestion(value);
    addQuestion(value);
  }

  const handleAddQuestionClick = () => {
    addQuestion(selectedQuestion);
  }

  const addQuestion = (type) => {
    if (type === "select" || type === "checkbox") {
      setQuestions([...questions, {
        type: type,
        name: "",
        options: [],
        isRequired: isRequired
      }]);
    }
    else {
      setQuestions([...questions, {
        type: type,
        name: "",
        isRequired: isRequired
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

  const handleIsRequiredChange = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].isRequired = !newQuestions[index].isRequired;
    setQuestions(newQuestions);
  }

  const handleSubmit = () => {
    const data = {
      title: formTitle,
      description: formDescription,
      questions: questions
    }
    console.log(JSON.stringify(data));
  }

  return (
    <div className='main-section'>
      <h1>Crear un formulario</h1>
      <div className='form-header'>
        <input className='title-input'
          type="text"
          placeholder='Título del formulario'
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}></input>
        <input
          className='description-input'
          type="text"
          placeholder='Descripción'
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}></input>
      </div>

      <div className='add-question-section'>
        <h3>Agregar pregunta</h3>
        <div className='add-question'>
          <select value={selectedQuestion}
            onChange={(e) => handleSelectChange(e.target.value)}>
            <option value="short">Respuesta corta</option>
            <option value="long">Párrafo</option>
            <option value="select">Desplegable</option>
            <option value="checkbox">Casilla de verificación</option>
            <option value="map">Mapa</option>
          </select>
          <button onClick={handleAddQuestionClick}>Agregar</button>
        </div>
      </div>

      <div className='question-section'>
        <h3>Preguntas</h3>
        <div className='questions'>
          {questions.map((question, index) => {
            return (
              <div className='question-box' key={index}>
                <Question
                  type={question.type}
                  id={index}
                  questions={questions}
                  handleDelete={handleDeleteQuestion}
                  handleChangeName={handleChangeName}
                  options={question.options}
                  addOption={addOption}
                  handleChangeOptions={handleChangeOptions}
                  removeOption={removeOption}
                  handleIsRequiredChange={handleIsRequiredChange}>
                  </Question>
              </div>
            )
          })}
        </div>
      </div>

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default CreateForm;