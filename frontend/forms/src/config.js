const API_URL = process.env.NODE_ENV === 'production' 
    ? 'YOUR_API_URL_HERE/api'  // IP pública de producción
    : 'http://localhost/api';  // Localhost en desarrollo

export default API_URL;
