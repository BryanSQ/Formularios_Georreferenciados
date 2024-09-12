import { useState, useEffect } from 'react';
import Question from './Question';
import './styles/CreateForm.css';
import { createForm } from '../services/formServices';
import useFetchData from '../hooks/useFetchData';

function CreateForm() {

  const { data, loading, error } = useFetchData('http://localhost/fields');

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("1");



  const handleSelectChange = (value) => {
    setSelectedQuestion(value);
  }

  const handleAddQuestionClick = () => {
    setQuestions([...questions, { type: selectedQuestion }]);
  }

  const handleDelete = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      is_visible: true,
      fields: []
    };

    const form = new FormData(e.target);

    data.name = form.get('name');
    data.description = form.get('description');

    const boxes = e.target.querySelectorAll('.question-box');

    boxes.forEach((box) => {
      const question = box.querySelector('[name="question-name"]');
      const questionName = question.value;
      const required = box.querySelector('[name="required"]').checked;

      const questionData = {
        name: questionName,
        type_id: question.getAttribute('type_id'),
        is_required: required
      };

      const options = box.querySelector('[name="options"]');

      if (options) {
        const optionInputs = options.querySelectorAll('input');

        const optionsArray = [];

        optionInputs.forEach((input, index) => {
          optionsArray.push(input.value);
        });

        questionData.options = optionsArray;
      }

      data.fields.push(questionData);
    });

    console.log(data);


    try {
      const response = await createForm(data);
      console.log('Formulario creado con éxito:', response);
    } catch (error) {
      console.error('Error al crear el formulario:', error);
    }
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Ocurrió un error: {error}</p>
  }

  return (
    <form onSubmit={handleSubmit} className='main-section'>
      <h1>Crear un formulario</h1>
      <div className='form-header'>
        <input className='title-input'
          type="text"
          placeholder='Título del formulario'
          name='name'
          required
        >
        </input>
        <input
          className='description-input'
          type="text"
          placeholder='Descripción'
          name='description'
          required
        >
        </input>
      </div>

      <div className='add-question-section'>
        <h3>Agregar pregunta</h3>
        <div className='add-question'>
          <select
            value={selectedQuestion}
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            {
              data.map((type) => {
                return <option key={type.id} value={type.id}>{type.name}</option>
              })
            }
          </select>
          <button onClick={handleAddQuestionClick}>Agregar</button>
        </div>
      </div>

      <div className='question-section'>
        <h3>Preguntas</h3>
        <div className='questions'>
          {
            questions.map((question, index) => {
              return (
                <div className='question-box' key={index}>
                  <Question type={question.type} />
                  <button onClick={() => handleDelete(index)}>Eliminar pregunta</button>
                </div>
              )
            })}
        </div>
      </div>

      <button>Enviar</button>
    </form>
  );
}

export default CreateForm;