import API_URL from "../config";

export const login = async (data) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
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

export const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Error al cerrar sesión.');
    }
    
    return response.json();
}

export const isLoggedIn = async () => {
    const response = await fetch(`${API_URL}/isLoggedIn`, {
        method: 'GET',
        credentials: 'include'
    });
    
    return response.ok;
}

