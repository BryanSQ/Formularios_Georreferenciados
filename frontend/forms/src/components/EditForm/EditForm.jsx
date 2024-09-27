import { useState, useEffect } from 'react';

import { 
  updateField, updateForm, 
  createOption, deleteOption, 
  updateOption, createField, deleteField 
} from '../../services/formServices';

import { useNavigate, useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { getFormFields, query } from '../../utils/forms';

import useFetchData from '../../hooks/useFetchData';

import EditQuestion from './EditQuestion';
import TypeSelect from '../helper/TypeSelect';
import API_URL from '../../config';
// import './styles/CreateForm.css';



export const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetchData(`${API_URL}/forms/${id}/fields`);

  const [questions, setQuestions] = useState([]);
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  useEffect(() => {
    if (data && data.form) {
      setQuestions(formatOptions(data.fields));
      setOriginalQuestions(formatOptions(data.fields));
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
    setQuestions([...questions, { id: uuidv4(), type: selectedQuestion }]);
  }

  const handleDelete = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  }


  const filterRemovedObjects = (original, comparison, key) => {
    return original
      .filter(item => !comparison.some(compareItem => compareItem[key] === item[key]))
  }


  const handleEdit = async (fieldId) => {
    const question = questions.find(question => question.id === fieldId);
    const questionBox = query(`.question-box[question_id="${fieldId}"]`);

    const name = query('input').value;
    const required = query('input[name="required"]').checked;

    const data = {
      id: fieldId,
      type: question.type,
      name,
      is_required: required,
    }


    if (question.name !== name || question.is_required !== required) {

      try {
        await updateField(fieldId, data);
      } catch (error) {
        console.error('Error al actualizar el campo:', error);
      }
    }

    // early return if the question does not have options (short text or long text)
    if (!question.options) return;

    const divOptions = questionBox.querySelector('div[name="options"]');

    const updates = Array.from(divOptions.querySelectorAll('input'))
      .map(input => ({ id: isNaN(input.id) ? -1 : parseInt(input.id), value: input.value }));

    // const removed = question.options.filter(option => !updates.some(input => input.id === option.id));

    const removed = filterRemovedObjects(question.options, updates, 'id');

    const added = updates.filter(({ id }) => id === -1);

    const changed = updates.filter(option => {
      const previousOption = question.options.find(prev => prev.id === option.id);
      return previousOption && previousOption.value !== option.value;
    });

    removed.forEach(async ({ id }) => {
      try {
        await deleteOption(id);
      } catch (error) {
        console.error('Error al eliminar la opción:', id);
      }
    });

    added.forEach(async ({ value }) => {
      try {
        await createOption(fieldId, { value });
      } catch (error) {
        console.error('Error al crear la opción:', error);
      }
    });

    changed.forEach(async ({ id, value }) => {
      try {
        await updateOption(id, { value });
      } catch (error) {
        console.error('Error al actualizar la opción:', error);
      }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('holaaa');
    const formTitle = query('#form-title').value;
    const formDescription = query('#form-description').value;
    const formId = id;

    const previousName = data.form.name;
    const previousDescription = data.form.description;

    const updatedData = {
      name: formTitle,
      description: formDescription,
      is_visible: true
    }

    if (formTitle !== previousName || formDescription !== previousDescription) {
      try {
        await updateForm(formId, updatedData);
      } catch (error) {
        console.error('Error al actualizar el formulario:', error);
      }
    }


    const questionBoxes = getFormFields(event).map(({ question_id, ...rest }) => {
      return {
        id: isNaN(question_id) ? -1 : parseInt(question_id),
        form_id: parseInt(formId),
        ...rest
      };
    });

    const added = questionBoxes.filter(({ id }) => id === -1);

    const removed = filterRemovedObjects(originalQuestions, questionBoxes, 'id').map(({ id }) => id);

    console.log(added);

    removed.forEach(async (id) => {
      try {
        await deleteField(id);
      } catch (error) {
        console.error('Error al eliminar el campo:', error);
      }
    });

    added.forEach(async (field) => {
      try {
        await createField(formId, field);
      } catch (error) {
        console.error('Error al crear el campo:', error);
      }
    });

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
                  <EditQuestion type={type} name={name} is_required={is_required} options={options} />
                  <button type='button' onClick={() => handleDelete(id)}>Eliminar</button>
                  <button type='button' onClick={() => handleEdit(id)}>Editar</button>
                </div>
              )
            })
          }
        </div>
      </div>

      <TypeSelect handleClick={handleAddQuestionClick} handleChange={handleSelectChange} />

      <button type='submit'>Enviar</button>
    </form>
  );
};
