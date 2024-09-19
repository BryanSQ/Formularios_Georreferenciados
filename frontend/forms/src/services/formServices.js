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

export const updateField = async (id, data) => {
  const response = await fetch(`${URL}/forms/fields/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    console.log('Error:', response);
    throw new Error('Error al actualizar el campo');
  }

  return response;
}

export const createOption = async (id, data) => {
  const response = await fetch(`${URL}/forms/fields/${id}/options`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al crear la opción');
  }

  return response.json();
}

export const deleteOption = async (id) => {
  const response = await fetch(`${URL}/forms/fields/options/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la opción');
  }

  return response.json();
}

export const updateOption = async (id, data) => {
  const response = await fetch(`${URL}/forms/fields/options/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la opción');
  }

  return response.json();
}


