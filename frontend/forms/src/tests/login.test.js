describe('API - Login Tests', () => {
    test('POST: If the user doesnt exist, the test should return a 404 status', async () => {
        const response = await fetch('http://localhost/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@uned.es',
                password: 'admin'
            })
        });

        expect(response.status).toBe(404);
    });

    test('POST: If the user exists, the test should return a 200 status', async () => {
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
    });

    test('POST: If the user exists but the password is incorrect, the test should return a 401 status', async () => {
        const response = await fetch('http://localhost/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@forms.cr',
                password: 'admin2'
            })
        });
        expect(response.status).toBe(401);
    });

    test('POST: If the user exists but the email is incorrect, the test should return a 401 status', async () => {
        const response = await fetch('http://localhost/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'administrator@forms.cr',
                password: 'admin'
            })
        });

        expect(response.status).toBe(401);
    });

    test('POST: Logout should return a 200 status', async () => {
        const response = await fetch('http://localhost/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        expect(response.status).toBe(200);
    });
});