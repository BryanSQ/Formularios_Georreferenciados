describe('API - UpdateForm Tests', () => {
    test('PUT: If the user is not authenticated, the test should return a 401 status', async () => {
        const response = await fetch('http://localhost/api/forms/1', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test Form Updated',
                description: 'Test Description Updated',
                is_visible: false,
            })
        });
        expect(response.status).toBe(401);
    });

    test('PUT: If the user is authenticated but the form doesn’t exist, should return 404', async () => {
        const loginResponse = await fetch('http://localhost/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@forms.cr',
                password: 'admin'
            })
        });
        expect(loginResponse.status).toBe(200);
        const cookie = loginResponse.headers.get('set-cookie');
        expect(cookie).toBeDefined();

        const response = await fetch('http://localhost/api/forms/000000', {
            method: 'PUT',
            headers: { 'Cookie': cookie },
            body: JSON.stringify({
                name: 'Test Form Updated',
                description: 'Test Description Updated',
                is_visible: false,
            })
        });

        expect(response.status).toBe(404);
    });

    test('PUT: If the user is authenticated and the form exist, should return 200 and update the form', async () => {
        const loginResponse = await fetch('http://localhost/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@forms.cr',
                password: 'admin'
            })
        });
        expect(loginResponse.status).toBe(200);
        const cookie = loginResponse.headers.get('set-cookie');
        expect(cookie).toBeDefined();

        const response = await fetch('http://localhost/api/forms/7', {
            method: 'PUT',
            headers: { 'Cookie': cookie },
            body: JSON.stringify({
                name: 'Test Form Updated',
                description: 'Test Description Updated',
                is_visible: false,
            })
        });

        expect(response.status).toBe(200);
    });
});