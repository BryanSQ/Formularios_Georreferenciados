import { useState, useEffect } from 'react';
import { updateField, updateForm, createOption, deleteOption, updateOption } from '../services/formServices';
import { useNavigate, useParams } from 'react-router-dom';

import useFetchData from '../hooks/useFetchData';

import EditQuestion from './edit/EditQuestion';
import TypeSelect from './helper/TypeSelect';

import './styles/CreateForm.css';

import API_URL from '../config';

import { v4 as uuidv4 } from 'uuid';




function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data, loading, error } = useFetchData(`${API_URL}/forms/${id}/fields`);

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
        formattedField.options = field.options.map((option) => { return { id: option.id, value: option.value } });
      }
      
      return formattedField;
    });
  }

  const handleSelectChange = (value) => {
    setSelectedQuestion(parseInt(value));
  }

  const handleAddQuestionClick = () => {
    setQuestions([...questions, { id: uuidv4() , type: selectedQuestion }]);
  }

  const handleDelete = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  }

  const handleEdit = async (fieldId) => {
    const question = questions.find(question => question.id === fieldId);
    const questionBox = document.querySelector(`.question-box[question_id="${fieldId}"]`);

    const name = questionBox.querySelector('input').value;
    const required = questionBox.querySelector('input[name="required"]').checked;

    const data = {
      id: fieldId,
      type: question.type,
      name,
      is_required: required,
    }


    if (question.name !== name || question.is_required !== required) {

      try {
        const response = await updateField(fieldId, data);
        console.log('Campo actualizado con éxito:', response);
      } catch (error) {
        console.error('Error al actualizar el campo:', error);
      }
    }

    // early return if the question does not have options (short text or long text)
    if (!question.options) return;

    const divOptions = questionBox.querySelector('div[name="options"]');

    const updates = Array.from(divOptions.querySelectorAll('input'))
      .map(input => ({ id: isNaN(input.id) ? -1 : parseInt(input.id), value: input.value }));

    const removed = question.options.filter(option => !updates.some(input => input.id === option.id));

    const added = updates.filter(({ id }) => id === -1);

    const changed = updates.filter(option => {
      const previousOption = question.options.find(prev => prev.id === option.id);
      return previousOption && previousOption.value !== option.value;
    });

    removed.forEach(async ({ id }) => {
      try {
        await deleteOption(id);
        console.log('Opción eliminada con éxito:', id);
      } catch (error) {
        console.error('Error al eliminar la opción:', id);
      }
    });

    added.forEach(async ({ value }) => {
      try {
        await createOption(fieldId, { value });
        console.log('Opción creada con éxito:', value);
      } catch (error) {
        console.error('Error al crear la opción:', error);
      }
    });

    changed.forEach(async ({ id, value }) => {
      try {
        await updateOption(id, { value });
        console.log('Opción actualizada con éxito:', value);
      } catch (error) {
        console.error('Error al actualizar la opción:', error);
      }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formTitle = document.querySelector('#form-title').value;
    const formDescription = document.querySelector('#form-description').value;
    const data = {
      name: formTitle,
      description: formDescription,
      questions: questions,
      is_visible: true
    }

    try {
      console.log('Antes de actualizar:', data);
      const response = await updateForm(id, data);
      console.log('Formulario actualizado con éxito:', response);
      navigate('/admin');
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
    }
  }

  return (

    <form onSubmit={(e) => handleSubmit(e)} className='main-section'>
      <h1>Editar formulario</h1>

      <div className='form-header'>
        <input className='title-input'
          id='form-title'
          type="text"
          placeholder='Título del formulario'
          defaultValue={data.form.name}></input>
        <textarea
          id="form-description"
          className='description-input'
          placeholder='Descripción'
          defaultValue={data.form.description}
        ></textarea>
      </div>      

      <div className='question-section'>
        <h3>Preguntas</h3>
        <div className='questions'>
          {
            questions.map(({ id, type, name, is_required, options }) => {
              return (
                <div className='question-box' key={id} question_id={id}>
                  <EditQuestion type={type} name={name} is_required={is_required} options={options}/>
                  <button type='button' onClick={() => handleDelete(id)}>Eliminar</button>
                  <button type='button' onClick={() => handleEdit(id)}>Editar</button>
                </div>
              )
            })
          }
        </div>
      </div>

      <TypeSelect handleClick={handleAddQuestionClick} handleChange={handleSelectChange}/>

      <button type='submit'>Enviar</button>
    </form>
  );
}

export default EditForm;