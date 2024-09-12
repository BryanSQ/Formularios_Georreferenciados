const URL = 'http://localhost';

export const sendAnswer = async (id, data) => {
  const response = await fetch(`${URL}/forms/${id}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al enviar la respuesta');
  }

  return response.json();
};

export const deleteForm = async (id) => {
  const response = await fetch(`${URL}/forms/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el formulario');
  }

  return response.json();
}

export const createForm = async (data) => {
  console.log('Data:', data);
  const response = await fetch(`${URL}/forms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al crear el formulario');
  }

  
  return response;
}

export const updateForm = async (id, data) => {
  const response = await fetch(`${URL}/forms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el formulario');
  }

  return response.json();
}


