import FormField from './FormField';

import useFetchData from '../hooks/useFetchData';

// Los datos no deben ser inyectados en el componente, deben ser obtenidos desde un servicio


const AnswerView = ({ id }) => {

  const { data: formData, loading, error } = useFetchData(`http://localhost/forms/${id}/fields`);  

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
    <div>
      <h1>Formulario: {formData.form.name}</h1>
      <p>{formData.form.description}</p>
      <form>
        {
          formData.fields
            .map((field, index) => (
              <FormField
                key={index}
                field={{ name: field.field_name, type: field.type_name, options: field.options || [] }}
              />
            ))
        }
        <button>Enviar</button>
      </form>
    </div>
  )
};

export default AnswerView;