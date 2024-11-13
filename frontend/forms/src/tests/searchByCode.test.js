describe('API - SearchByCode Tests', () => {
    test('GET: If the code doesnt exist, the test should return a 404 status', async () => {
        const response = await fetch('http://localhost/api/forms/search/00000/fields', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        expect(response.status).toBe(404);
    });

    test('GET: If the code exists, the test should return a 200 status and the response must contain the form and fields properties', async () => {
        const code = 'LascTW';
        const response = await fetch(`http://localhost/api/forms/search/${code}/fields`, {
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