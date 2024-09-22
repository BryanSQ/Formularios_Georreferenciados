import { useState } from 'react';
import { createForm } from '../services/formServices';
import { useNavigate } from 'react-router-dom';

import Question from './Question';
import TypeSelect from './helper/TypeSelect';

import './styles/CreateForm.css';

import { v4 as uuidv4 } from 'uuid';


function CreateForm() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);


  const handleSelectChange = (value) => {
    setSelectedQuestion(parseInt(value));
  }

  const handleAddQuestionClick = () => {
    setQuestions([...questions, { id: uuidv4(), type: selectedQuestion }]);
    console.log(questions);
  }

  const handleDelete = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
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



    try {
      const response = await createForm(data);
      console.log('Formulario creado con éxito:', response);
      navigate('/admin');
    } catch (error) {
      console.error('Error al crear el formulario:', error);
    }
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
        ></input>
        <textarea
          className='description-input'
          type="text"
          placeholder='Descripción'
          name='description'
          required
        ></textarea>
      </div>

      <TypeSelect handleClick={handleAddQuestionClick} handleChange={handleSelectChange} />

      <div className='question-section'>
        <h3>Preguntas</h3>
        <div className='questions'>
          {
            questions.map(({ id, type }) => {
              return (
                <div className='question-box' key={id}>
                  <Question type={type}/>
                  <button type='button' onClick={() => handleDelete(id)}>Eliminar pregunta</button>
                </div>
              )
            })}
        </div>
      </div>

      <button type='submit'>Enviar</button>
    </form>
  );
}

export default CreateForm;