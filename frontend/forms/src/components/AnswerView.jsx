import FormField from './FormField';

import useFetchData from '../hooks/useFetchData';

import { sendAnswer } from '../services/formServices';

// Los datos no deben ser inyectados en el componente, deben ser obtenidos desde un servicio


const AnswerView = ({ id }) => {

  const { data: formData, loading, error } = useFetchData(`http://localhost/forms/${id}/fields`);


  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    const fData = new FormData(e.target);

    // Convert FormData to a plain object
    const data = [];
    for (let [key, value] of fData.entries()) {
      let element = e.target.querySelector(`[name="${key}"]`);
      const elementId = element ? element.id : null;
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
      data.push({
        field_id: elementId, // The form element's id
        option_id: selectedOptionId, // The id of the selected option or checkbox, if applicable
        field: key, // The name attribute of the field
        answer: value // The field value
      });
    }

    const answer = {
      form_id: formData.form.id,
      fields: data
    }
  
    try{
      const response = await sendAnswer(formData.form.id,answer);
      console.log(response);
    }
    catch(error){
      console.error(error);
    }
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error}</p>;
  }

  if (formData.error) {
    return <p>{formData.error}</p>;
  }

  return (
    <div className='main-section'>
      <h1>Formulario: {formData.form.name}</h1>
      <p>{formData.form.description}</p>
      <form 
        onSubmit={handleSubmitAnswer}
        className='question-section'      
      >
        {
          formData.fields
            .map((field) => (
              <FormField
                key={field.id}
                field={{ id: field.id, name: field.name, type: field.type, options: field.options || [] }}
              />
            ))
        }
        <button>Enviar</button>
      </form>
    </div>
  )
};

export default AnswerView;