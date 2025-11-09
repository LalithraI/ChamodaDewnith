// API Configuration
export const API_URL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_API_URL || 'https://your-backend-url.onrender.com'
  : 'http://localhost:5000';

export const config = {
  apiUrl: API_URL,
  emailJS: {
    serviceID: 'service_2j3l983',
    templateID: 'template_0m76fbo',
    userID: 'JIjL5N4wvhpimQvFq'
  }
};
