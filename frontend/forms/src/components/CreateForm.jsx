import { useState, useEffect } from 'react';
import Question from './Question';
import './styles/CreateForm.css';
import { createForm } from '../services/formServices';

function CreateForm() {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('1');
  const [isRequired, setIsRequired] = useState(false);

  const handleSelectChange = (value) => {
    setSelectedQuestion(value);
    addQuestion(value);
  }

  const handleAddQuestionClick = () => {
    addQuestion(selectedQuestion);
  }

  const addQuestion = (type) => {
    if (type === "4" || type === "3") {
      setQuestions([...questions, {
        type_id: type,
        name: "",
        options: [],
        is_required: isRequired
      }]);
    }
    else {
      setQuestions([...questions, {
        type_id: type,
        name: "",
        is_required: isRequired
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
    newQuestions[index].is_required = !newQuestions[index].is_required;
    setQuestions(newQuestions);
  }

  const handleSubmit = async () => {
    const data = {
      name: formTitle,
      description: formDescription,
      fields: questions
    };

    console.log('Datos a enviar:', data);
  
    try {
      const response = await createForm(data);
      console.log('Formulario creado con éxito:', response);
    } catch (error) {
      console.error('Error al crear el formulario:', error);
    }
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
            <option value="1">Respuesta corta</option>
            <option value="2">Párrafo</option>
            <option value="4">Desplegable</option>
            <option value="3">Casilla de verificación</option>
            <option value="5">Mapa</option>
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
                  type={question.type_id}
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