import axios from 'axios';

const API_URL = 'https://reqres.in/api/users';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // En caso de error, devuelve un array vacío
    }
};
