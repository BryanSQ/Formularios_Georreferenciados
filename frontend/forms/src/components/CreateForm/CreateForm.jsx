import { useState } from 'react';
import { createForm } from '../../services/formServices';
import { useNavigate } from 'react-router-dom';

import './CreateForm.css';

import { v4 as uuidv4 } from 'uuid';
import { getFormFields } from '../../utils/forms';
import { Question, QuestionBody, QuestionFooter, QuestionHeader } from '../UI/question';
import { Field, TypeSelect } from '../UI';


export const CreateForm = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);


  const handleAdd = () => {
    setQuestions([...questions, { id: uuidv4(), type: 1 }]);
  }

  const handleDelete = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  }

  const changeType = (id, type) => {
    setQuestions(questions.map(question => {
      if (question.id === id) {
        return { ...question, type: parseInt(type) };
      }
      return question;
    }));
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

    console.log(data);

    if (data.fields.length === 0) {
      console.error('Error al crear el formulario: No hay campos');
      return;
    }


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
          questions.map(({ id, type }) => {
            return (
              <Question key={id} >

                <QuestionHeader>
                  <input id='question-name' type_id={type} name='question-name' type="text" placeholder='Pregunta' />
                  <TypeSelect id={id} handleChange={changeType} />
                </QuestionHeader>

                <QuestionBody>
                  <Field type={type} />
                </QuestionBody>

                <QuestionFooter>
                  <div>
                    <label htmlFor='required'>¿Obligatoria?</label>
                    <input id='required' name='required' type='checkbox' />
                  </div>
                  <button type='button' className='delete-button' onClick={() => handleDelete(id)}>
                    Eliminar
                  </button>
                </QuestionFooter>
                
              </Question>
            );
          })
        }

        <button id="add-field" type='button' className='container' onClick={handleAdd}>
          Agregar
        </button>

        <button type='submit' className='accept-button'>
          Enviar
        </button>

      </form>
    </section>
  );
};

{/* <div key={id} className='container question-box'>
  <Question />
  <div className='question-box-footer'>
    <div>
      <label htmlFor='required'>¿Obligatoria?</label>
      <input id='required' name='required' type='checkbox' />
    </div>
    <button type='button' className='delete-button' onClick={() => handleDelete(id)}>
      Eliminar
    </button>
  </div>
</div> */}