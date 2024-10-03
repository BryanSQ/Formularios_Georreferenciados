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


import API_URL from '../../config';

import '../CreateForm/CreateForm.css';
import './EditForm.css';
import { Question, QuestionBody, QuestionFooter, QuestionHeader } from '../UI/question';
import { Field, TypeSelect } from '../UI';




export const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetchData(`${API_URL}/forms/${id}/fields`);

  const [questions, setQuestions] = useState([]);


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
        tag: 'old'
      };

      if (field.type.id === 4 || field.type.id === 3) {
        formattedField.options = field.options.map((option) => { return { id: option.id, value: option.value } });
      }

      return formattedField;
    });
  }

  const handleAdd = () => {
    const newId = uuidv4();
    setQuestions([...questions, { id: newId, type: 1, tag: 'new' }]);
  }

  const handleDelete = (id) => {
    // find the id and set the tag to delete
    setQuestions(questions.map(question => {
      if (question.id === id) {
        return { ...question, tag: 'delete' };
      }
      return question;
    }));
  }

  const changeType = (id, type) => {
    setQuestions(questions.map(question => {
      if (question.id === id) {
        return { ...question, type: parseInt(type) };
      }
      return question;
    }));
  }


  const filterRemovedObjects = (original, comparison, key) => {
    return original
      .filter(item => !comparison.some(compareItem => compareItem[key] === item[key]))
  }

  const handleEdit = async (fieldId) => {
    const question = questions.find(question => question.id === fieldId);
    const questionBox = query(`.question-box[question_id="${fieldId}"]`);
    
    const name = questionBox.querySelector('[name="question-name"]').value;

    const required = questionBox.querySelector('input[name="required"]').checked;

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

    const divOptions = questionBox.querySelector('.question-box-body')

    const updates = Array.from(divOptions.querySelectorAll('input'))
      .map(input => ({ id: isNaN(input.id) ? -1 : parseInt(input.id), value: input.value }));

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

    const form = new FormData(event.target);
    
    const formTitle = form.get('title');
    const formDescription = form.get('description');
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


    const questionBoxes = getFormFields(event).map(question => {
      return {
        form_id: formId,
        ...question
      };
    });

    const added = questionBoxes.filter(question => questions.some(({ id, tag }) => question.id === id && tag === 'new'));

    const removed = questions.filter(({ tag }) => tag === 'delete').map(({ id }) => id);

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

    // remove the deleted fields and set remaining fields as old
    setQuestions(questions.filter(({ id }) => !removed.includes(id)).map(question => {
      return { ...question, tag: 'old' };
    }));
  }

  return (
    <section className='main-section'>

      <form className='new-form' onSubmit={(e) => handleSubmit(e)}>

        <div className='form-info container'>
          <div className='form-title'>
            <input name='title' type="text" placeholder='Título del formulario' defaultValue={data.form.name} />
          </div>
          <div className='form-description'>
            <textarea name='description' placeholder='Añade una descripción' defaultValue={data.form.description} ></textarea>
          </div>
        </div>

        {
          questions.map(({ id, type, tag, name, is_required, options }) => {
            if (tag === 'delete') return null;            
            return (
              <Question key={id} id={id}>

                <QuestionHeader>
                  <input id={id} type_id={type} type="text" name="question-name" placeholder="Pregunta" defaultValue={name || ''} />
                  {
                    tag === 'new' && ( <TypeSelect id={id} handleChange={changeType} />)
                  }
                </QuestionHeader>

                <QuestionBody>
                  <Field type={type} options={options} />
                </QuestionBody>

                <QuestionFooter>
                  <div>
                    <label htmlFor="required">¿Obligatoria?</label>
                    <input id="required" name="required" type="checkbox" defaultChecked={is_required} />
                  </div>
                  <button className='delete-button' type='button' onClick={() => handleDelete(id)}>Eliminar</button>
                  <button className='accept-button' type='button' onClick={() => handleEdit(id)}>Guardar Cambios</button>
                </QuestionFooter>

              </Question>
            )
          })
        }

        <button id="add-field" type='button' className='container' onClick={handleAdd}>
          Agregar
        </button>

        <button className='accept-button' type='submit'>Enviar</button>
      </form>

    </section>
  );
};