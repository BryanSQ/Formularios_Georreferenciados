import { useNavigate, useParams } from 'react-router-dom';

import useFetchData from '../../hooks/useFetchData';
import FormField from '../UI/FormField';

import API_URL from '../../config';

export const PreviewForm = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetchData(`${API_URL}/forms/${id}/fields`);

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
      <div
        className='question-section'
      >
        {
          data.fields
            .map((field) => (
              <FormField key={field.id} field={field} />
            ))
        }
        <button className='send-answer-button'>Enviar</button>
      </div>
    </div>
  )
};