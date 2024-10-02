import API_URL from "../config";

export const login = async (data) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        if(response.status === 401){
            throw new Error('Correo electrónico o contraseña incorrectos.');
        } else if(response.status === 400){
            throw new Error('Ingrese un correo electrónico y una contraseña.');
        } else {
            throw new Error('Error al iniciar sesión.');
        }
    }
    
    return response.json();
}

