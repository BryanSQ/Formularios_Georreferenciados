import { useState, useEffect } from 'react';
import { updateForm } from '../services/formServices';

import useFetchData from '../hooks/useFetchData';

import Question from './Question';
import TypeSelect from './helper/TypeSelect';

import './styles/CreateForm.css';

function EditForm({ id }) {
  
  const { data, loading, error } = useFetchData(`http://localhost/forms/${id}/fields`);

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  useEffect(() => {
    if (data && data.form) {
      setQuestions(formatOptions(data.fields));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatOptions = (fields) => {
    return fields.map((field) => {
      const formattedField = {
        id: field.id,
        name: field.name,
        type: parseInt(field.type.id),
        is_required: field.is_required,
      };
  
      if (field.type.id === 4 || field.type.id === 3) {
        formattedField.options = field.options.map((option) => option.value);
      }
  
      return formattedField;
    });
  }


  const handleSelectChange = (value) => {
    setSelectedQuestion(parseInt(value));
  }

  const handleAddQuestionClick = () => {
    setQuestions([...questions, { id: crypto.randomUUID() , type: selectedQuestion }]);
  }

  const handleDelete = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  }

  const handleSubmit = async () => {
    const data = {
      name: formTitle,
      description: formDescription,
      questions: questions,
      is_visible: true
    }

    try {
      const response = await updateForm(id, data);
      console.log('Formulario creado con éxito:', response);
    } catch (error) {
      console.error('Error al crear el formulario:', error);
    }
  }



  return (
    <form onSubmit={handleSubmit} className='main-section'>
      <h1>Editar formulario</h1>

      <div className='form-header'>
        <input className='title-input'
          type="text"
          placeholder='Título del formulario'
          value={data.form.name}
          onChange={(e) => setFormTitle(e.target.value)}></input>
        <input
          className='description-input'
          type="text"
          placeholder='Descripción'
          value={data.form.description}
          onChange={(e) => setFormDescription(e.target.value)}></input>
      </div>

      <TypeSelect handleClick={handleAddQuestionClick} handleChange={handleSelectChange}/>

      <div className='question-section'>
        <h3>Preguntas</h3>
        <div className='questions'>
          {
            questions.map(({ id, type }) => {
              return (
                <div className='question-box' key={id}>
                  <Question type={type} />
                  <button type='button' onClick={() => handleDelete(id)}>Eliminar</button>
                </div>
              )
            })
          }
        </div>
      </div>

      <button type='submit'>Enviar</button>
    </form>
  );
}

export default EditForm;