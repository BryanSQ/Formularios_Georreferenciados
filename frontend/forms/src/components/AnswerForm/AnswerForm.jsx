import { useNavigate, useParams } from 'react-router-dom';

import { sendAnswer } from '../../services/formServices';
import useFetchData from '../../hooks/useFetchData';
import FormField from './FormField';
import './AnswerForm.css';

import API_URL from '../../config';

export const AnswerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading, error } = useFetchData(`${API_URL}/forms/${id}/fields`);


  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Convert FormData to a plain object
    const objectData = [];
    for (let [key, value] of formData.entries()) {
      let element = e.target.querySelector(`[name="${key}"]`);
      console.log(element);
      const elementId = element ? element.id : null;
      const type = element ? element.getAttribute('type_id') : null;
      let selectedOptionId = null;

      // If the field is a select element, get the id of the selected option
      if (element && element.tagName === 'SELECT') {
        const selectedOption = element.querySelector(`option[value="${value}"]`);
        if (selectedOption) {
          selectedOptionId = selectedOption.id;
        }
      }

      // Handle checkboxes: if it's a checkbox, get its id as well
      if (element && element.type === 'checkbox') {
        element = e.target.querySelector(`[name="${key}"]:checked`);
        selectedOptionId = element.getAttribute('option_id'); // Retrieve the custom option_id attribute
      }

      // Push the data to the array, including the field id and the option/checkbox id
      objectData.push({
        field_id: elementId, // The form element's id
        type_id: type, // The form element's type id
        option_id: selectedOptionId, // The id of the selected option or checkbox, if applicable
        field: key, // The name attribute of the field
        answer: value // The field value
      });
    }

    const answer = {
      form_id: data.form.id,
      fields: objectData
    }

    console.log(JSON.stringify(answer));

    try {
      const response = await sendAnswer(data.form.id, answer);
      console.log(response);
      navigate('/admin');
    }
    catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error}</p>;
  }

  return (
    <div className='answer-view'>
      <div className='form-info'>
        <h1 className='form-title'>Formulario: {data.form.name}</h1>
        <p className='form-description'>{data.form.description}</p>
      </div>
      <form
        onSubmit={handleSubmitAnswer}
        className='question-section'
      >
        {
          data.fields
            .map((field) => (
              <FormField key={field.id} field={field} />
            ))
        }
        <button className='send-answer-button'>Enviar</button>
      </form>
    </div>
  )
};