import { useState } from 'react';
import { createForm } from '../../services/formServices';
import { useNavigate } from 'react-router-dom';

import Question from './Question';
import TypeSelect from '../helper/TypeSelect';

import './CreateForm.css';

import { v4 as uuidv4 } from 'uuid';
import { getFormFields } from '../../utils/forms';


export const CreateForm = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);


  const handleSelectChange = (value) => {
    setSelectedQuestion(parseInt(value));
  }

  const handleAddQuestionClick = () => {
    setQuestions([...questions, 
      { 
        id: uuidv4(),
        type: 3 //selectedQuestion 
      }]);
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


    data.name = form.get('title');
    data.description = form.get('description');

    data.fields = getFormFields(e);


    try {
      const response = await createForm(data);
      console.log('Formulario creado con éxito:', response);
      navigate('/admin');
    } catch (error) {
      console.error('Error al crear el formulario:', error);
    }
  }

  return (
    <section className='main-section'>

      <form className='new-form' onSubmit={handleSubmit}>

        <div className="form-info container">
          <div className="form-title">
            <input name='title' type='text' placeholder='Nuevo Formulario' required />
          </div>
          <div className="form-description">
            <textarea name='description' type='text' placeholder='Añade una descripción' required ></textarea>
          </div>
        </div>

        {
          questions.map(({id, type}) => (
            <div key={id} className='container question-box'>
              <Question type={type} />
              <div className='box-options'>
                <button className='delete-button' type='button' onClick={() => handleDelete(id)}>Eliminar campo</button>
              </div>
            </div>
          ))
        }

        <button id="add-field" type='button' className='container' onClick={handleAddQuestionClick}>
          Agregar
        </button>

        <button type='submit'>
          Enviar
        </button>     

      </form>
    </section>
  );
};