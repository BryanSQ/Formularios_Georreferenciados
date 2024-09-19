import { useState, useEffect } from 'react';
import { updateField, updateForm, createOption, deleteOption, updateOption } from '../services/formServices';
import { useNavigate, useParams } from 'react-router-dom';

import useFetchData from '../hooks/useFetchData';

import Question from './Question';
import TypeSelect from './helper/TypeSelect';

import './styles/CreateForm.css';

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
        formattedField.options = field.options.map((option) => { return { id: option.id, value: option.value } });
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

  const handleEdit = async (id) => {
    const question = questions.find(question => question.id === id);
    const questionBox = document.querySelector(`.question-box[question_id="${id}"]`);
    const name = questionBox.querySelector('input').value;
    const required = questionBox.querySelector('input[name="required"]').checked;
    const divOptions = questionBox.querySelector('div[name="options"]');
    const inputs = divOptions.querySelectorAll('input.multiple');

    // Recorre los inputs y extrae el value y el id
    const newOptions = Array.from(inputs).map(input => ({
      id: /[a-zA-Z]/.test(input.id) ? -1 : parseInt(input.id),
      value: input.value
    }));

    console.log('Options:', question.options);
    console.log('newOptions:', newOptions);
    

    // Identificar los ids en ambos arrays
    const previousIds = question.options.map(option => option.id);
    const inputIds = newOptions.map(option => option.id);
    

    console.log('previousIds:', previousIds);
    console.log('inputIds:', inputIds);

    // Desaparecieron (están en previousArray pero no en inputArray)
    const disappeared = question.options.filter(option => !inputIds.includes(option.id));

    // Nuevas (están en inputArray pero no en previousArray)
    const addedOptions = newOptions.filter(option => !previousIds.includes(option.id));

    // Cambiaron (están en ambos arrays pero cambió el value)
    const changed = newOptions.filter(option => {
        const previousOption = question.options.find(prev => prev.id === option.id);
        return previousOption && previousOption.value !== option.value;
    });

    disappeared.forEach(async option => {
      try {
        await deleteOption(option.id);
        console.log('Opción eliminada con éxito:', option.id);
      } catch (error) {
        console.error('Error al eliminar la opción:', error);
      }
    });

    addedOptions.forEach(async option => {
      try {
        const data = {
          value: option.value
        }
        await createOption(id, data);
        console.log('Opción creada con éxito:', option);
      } catch (error) {
        console.error('Error al crear la opción:', error);
      }
    });

    changed.forEach(async option => {
      try {
        const data = {
          value: option.value
        }
        await updateOption(option.id, data);
        console.log('Opción actualizada con éxito:', option);
      } catch (error) {
        console.error('Error al actualizar la opción:', error);
      }
    });

    const data = {
      id,
      type: question.type,
      name: name, 
      is_required: required ? 1 : 0
    }

    try {
      const response = await updateField(id, data);
      console.log('Campo actualizado con éxito:', response);
    } catch (error) {
      console.error('Error al actualizar el campo:', error);
    }
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

      <TypeSelect handleClick={handleAddQuestionClick} handleChange={handleSelectChange}/>

      <div className='question-section'>
        <h3>Preguntas</h3>
        <div className='questions'>
          {
            questions.map(form => {
              const { id, type, name, is_required } = form
              let options = null;
              if(type === 3 || type === 4) {
                options = form.options;
                console.log('Opciones desde editForm:', options);
              }
              return (
                <div className='question-box' key={id} question_id={id}>
                  <Question type={type} name={name} is_required={is_required} options={options}/>
                  <button type='button' onClick={() => handleDelete(id)}>Eliminar</button>
                  <button type='button' onClick={() => handleEdit(id)}>Editar</button>
                </div>
              )
            })
          }
        </div>
      </div>

      <button type='submit'>Enviar</button>
    </form>
  );

  // Auxiliar functions to manage the options editing
  function findNewElements(newArray, oldArray) {
    return newArray.filter(newElement => !oldArray.some(oldElement => oldElement.id === newElement.id));
  }
  
  // Función para encontrar elementos eliminados
  function findDeletedElements(newArray, oldArray) {
    return oldArray.filter(oldElement => !newArray.some(newElement => newElement.id === oldElement.id));
  }
  
  // Función para encontrar elementos actualizados
  function findUpdatedElements(newArray, oldArray) {
    return newArray.filter(newElement => {
      const oldElement = oldArray.find(oldElement => oldElement.id === newElement.id);
      return oldElement && oldElement.value !== newElement.value;
    });
  }
}

export default EditForm;