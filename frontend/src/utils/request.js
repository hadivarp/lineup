import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCategories = async () => {
    try {
        const response = await apiService.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const todos = async () => {
    try {
        const response = await apiService.get('/todos');
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};
