const URL = 'http://localhost/api';

export const login = async (data) => {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Error al iniciar sesión');
    }
    
    return response.json();
}

