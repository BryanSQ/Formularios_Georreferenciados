describe("Submit an answer to the system", () => {
  test('POST - Save an answer', async () => {
    const response = await fetch("http://localhost/api/forms/48/answers", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "form_id":48,
        "fields":[{"field_id":"95","type_id":"1","option_id":null,"field":"diay a ver","answer":"respuesta de prueba"}]
      })
    });

    expect(response.status).toBe(200);
  });

  test('POST - Save an answer - Error', async () => {
    const response = await fetch("http://localhost/api/forms/42342/answers", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "form_id":48,
        "fields":[{"field_id":"95","type_id":"1","option_id":null,"field":"diay a ver","answer":"respuesta de prueba"}]
      })
    });

    expect(response.status).toBe(404);
  });
});


