describe('API - DeleteForm Tests', () => {
    test('DELETE: If the user is not authenticated, the test should return a 401 status', async () => {
        const response = await fetch('http://localhost/api/forms/1', {
            method: 'DELETE',
            credentials: 'include'
        });
        expect(response.status).toBe(401);
    });

    test('DELETE: If the user is authenticated but the form doesn’t exist, should return 404', async () => {
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
            method: 'DELETE',
            headers: { 'Cookie': cookie }  
        });

        expect(response.status).toBe(404);
    });

    test('DELETE: If the user is authenticated and the form exist, should return 200 and delete the form', async () => {
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
 
        const response = await fetch('http://localhost/api/forms/1', {
            method: 'DELETE',
            headers: { 'Cookie': cookie }  
        });

        expect(response.status).toBe(200);
    });
});