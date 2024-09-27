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
      <div className="form-info">
        <div className="form-title">
          <input id='title' type='text' placeholder='Nuevo Formulario' required />
        </div>
        <div className="form-description">
        <textarea id='description' type='text' placeholder='Añade una descripción' required ></textarea>
        </div>
      </div>
    </section>
  );
};