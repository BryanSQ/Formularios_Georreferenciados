const API_URL = process.env.NODE_ENV === 'production' 
    ? 'http://150.136.56.106/api'  // IP pública de producción
    : 'http://localhost/api';  // Localhost en desarrollo

export default API_URL;
