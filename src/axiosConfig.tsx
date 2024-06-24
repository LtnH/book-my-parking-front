import axios from 'axios';

// Configuration globale d'Axios
axios.defaults.withCredentials = true;

// Vous pouvez également définir la base URL si elle est constante
axios.defaults.baseURL = 'http://localhost:8000';

export default axios;