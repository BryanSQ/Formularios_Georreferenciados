describe('API - AddForm Tests', () =>{
    test('POST: If the user isnt authenticated, the test should return a 401 status', async () => {
        const response = await fetch('http://localhost/api/forms', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Form 1',
                fields: []
            })
        });
        expect(response.status).toBe(401);
    });

    test('POST: If the user is authenticated, the test should return a 200 status and create the form', async () => {
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
 
        const response = await fetch('http://localhost/api/forms', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Cookie': cookie,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test Form',
                description: 'Test Description',
                is_visible: true,
                fields: [
                    {
                        "name": "corta",
                        "is_required": 1, 
                        "type_id": 1
                    },
                    {
                        "name": "segunda corta",
                        "is_required": 1, 
                        "type_id": 1
                    },
                    {
                        "name": "larga",
                        "is_required": 2, 
                        "type_id": 1
                    }, 
                    {
                        "name": "select",
                        "is_required": 0,
                        "type_id":4,
                        "options":[
                            "opc1"
                        ]
                    }
            
                ]
            })
        });

        expect(response.status).toBe(200);
    });
});