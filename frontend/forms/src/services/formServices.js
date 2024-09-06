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

