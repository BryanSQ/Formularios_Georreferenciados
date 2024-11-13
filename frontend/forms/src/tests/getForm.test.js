describe('API - GetForm Tests', () => {
    test('GET: If the id doesnt exist, the test should return a 404 status', async () => {
        const response = await fetch('http://localhost/api/forms/000000/fields', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        expect(response.status).toBe(404);
    });

    test('GET: If the id exists, the test should return a 200 status and the response must contain the form and fields properties', async () => {
        const id = '6';
        const response = await fetch(`http://localhost/api/forms/${id}/fields`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('form');
        expect(data).toHaveProperty('fields');
    })
});