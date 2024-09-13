import { useState, useEffect } from 'react';
import Question from './Question';
import useFetchData from '../hooks/useFetchData';
import './styles/CreateForm.css';
import { updateForm } from '../services/formServices';

function EditForm({ id }) {

  const { data: fieldData, loading: fieldLoading, error: FieldError } = useFetchData(`http://localhost/fields`);

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
        name: field.name,
        type_id: parseInt(field.type.id),
        is_required: field.is_required,
      };
  
      if (field.type.id === 4 || field.type.id === 3) {
        formattedField.options = field.options.map((option) => option.value);
      }
  
      return formattedField;
    });
  }


  const handleSelectChange = (value) => {
    setSelectedQuestion(value);
  }

  const handleAddQuestionClick = () => {
    setQuestions([...questions, { type_id: parseInt(selectedQuestion) }]);
  }

  const handleDelete = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
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
    <div className='main-section'>
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

      <div className='add-question-section'>
        <h3>Agregar pregunta</h3>
        <div className='add-question'>
          <select value={selectedQuestion}
            onChange={(e) => handleSelectChange(e.target.value)}>
            {
              fieldData.map((type) => {
                return <option key={type.id} value={type.id}>{type.name}</option>
              })
            }
          </select>
          <button type='button' onClick={handleAddQuestionClick}>Agregar</button>
        </div>
      </div>

      <div className='question-section'>
        <h3>Preguntas</h3>
        <div className='questions'>
          {
            questions.map((question, index) => {
              return (
                <div className='question-box' key={index}>
                  {question.type_id}    
                  <Question type={question.type_id} />
                  <button type='button' onClick={() => handleDelete(index)}>Eliminar</button>
                </div>
              )
            })
          }
        </div>
      </div>

      <button type='submit' onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default EditForm;