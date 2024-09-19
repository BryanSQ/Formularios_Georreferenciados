import { useState, useEffect } from 'react';
import { updateField, updateForm } from '../services/formServices';
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

  const handleEdit = async (id) => {
    const question = questions.find(question => question.id === id);
    const questionBox = document.querySelector(`.question-box[question_id="${id}"]`);
    const name = questionBox.querySelector('input').value;
    const required = questionBox.querySelector('input[name="required"]').checked;

    const data = {
      id,
      type: question.type,
      name: name, 
      is_required: required
    }

    console.log('Editando pregunta:', JSON.stringify(data));

    try {
      const response = await updateField(id, data);
      console.log('Campo actualizado con éxito:', response);
    } catch (error) {
      console.error('Error al actualizar el campo:', error);
    }
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
      console.log('Formulario actualizado con éxito:', response);
      navigate('/admin');
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
    }
  }



  return (
    <form onSubmit={handleSubmit} className='main-section'>
      <h1>Editar formulario</h1>

      <div className='form-header'>
        <input className='title-input'
          type="text"
          placeholder='Título del formulario'
          defaultValue={data.form.name}></input>
        <textarea
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
            questions.map(({ id, type, name }) => {
              return (
                <div className='question-box' key={id} question_id={id}>
                  <Question type={type} name={name} />
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
}

export default EditForm;