const API_URL = process.env.NODE_ENV === 'production' 
    ? 'http://129.159.93.14/api'  // IP pública de producción
    : 'http://localhost/api';  // Localhost en desarrollo

export default API_URL;
