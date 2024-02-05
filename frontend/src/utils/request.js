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

export const postCategories = async (categoryData) => {
    try {
        const response = await apiService.post('/categories', categoryData);
        return response.data;
    } catch (error) {
        console.error('Error posting categories:', error);
        throw error;
    }
};

export const getTodos = async () => {
    try {
        const response = await apiService.get('/todos');
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const postTodos = async (todoData) => {
    try {
        const response = await apiService.post('/todos', todoData);
        return response.data;
    } catch (error) {
        console.error('Error posting todos:', error);
        throw error;
    }
};

export const putTodos = async (categoryId, categoryData) => {
    try {
        const response = await apiService.put(`/categories/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating categories:', error);
        throw error;
    }
};

export const deleteTodos = async (todoId) => {
    try {
        const response = await apiService.delete(`/todos/${todoId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting todos:', error);
        throw error;
    }
};
