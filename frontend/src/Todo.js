import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { getTodos, getCategories, postCategories, postTodos, putTodos, deleteTodos } from './utils/request';
import { PlusOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

const Todo: React.FC = () => {
    const [todos, setTodos] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                const categoriesList = response && response.categories ? response.categories : [];
                setCategories(categoriesList);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await getTodos();
                const todoList = response && response.todos ? response.todos : [];
                setTodos(todoList);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await getTodos();
            setTodos(response.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddNewCategory = async () => {
        try {
            await postCategories({ name: newCategoryName });
            // Refresh todos and categories after adding a new category
            await fetchTodos();
            setNewCategoryName('');
            setIsAddCategoryModalVisible(false);
        } catch (error) {
            console.error('Error adding new category:', error);
        }
    };

    const handleAddTodo = async (category) => {
        try {
            const userInput = prompt('Enter the title for the new todo:');

            if (userInput) {
                await postTodos({ title: userInput, category });
                // Fetch updated todos after adding a new todo
                await fetchTodos();
            } else {
                console.log('User cancelled the operation.');
            }
        } catch (error) {
            console.error('Error adding new todo:', error);
        }
    };

    const handleUpdateTodo = async (todoId) => {
        try {
            await putTodos(todoId, /* Updated Todo Data */);
            // Fetch updated todos after updating a todo
            await fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteTodos(todoId);
            // Fetch updated todos after deleting a todo
            await fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const tabItems: TabsProps['items'] = categories
        .map((category, index) => {
            const todosForCategory = todos.filter(todo => {
                if (category) {
                    return todo.categories.some(cat => cat.name === category.name);
                } else {
                    return todo.categories.length === 0;
                }
            });

            return {
                key: `${index + 1}`,
                label: (
                    <div>
                        <span>{category && category.name ? category.name : 'No Category'}</span>
                        {!category && (
                            <Button type="link" onClick={() => setIsAddCategoryModalVisible(true)}>
                                <PlusOutlined />
                            </Button>
                        )}
                    </div>
                ),
                children: (
                    <div>
                        <ul>
                            {todosForCategory.map(todo => (
                                <li key={todo.id}>
                                    {todo.title}{' '}
                                    <Button type="link" onClick={() => handleAddTodo(category)}>
                                        <PlusOutlined />
                                    </Button>
                                    <Button type="link" onClick={() => handleUpdateTodo(todo.id)}>
                                        <EditOutlined />
                                    </Button>
                                    <Button type="link" onClick={() => handleDeleteTodo(todo.id)}>
                                        <CloseOutlined />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ),
            };
        });

    const hasNoCategory = todos.some(todo => todo.categories.length === 0);

    if (hasNoCategory) {
        tabItems.push({
            key: 'no-category',
            label: (
                <div>
                    <span>No Category</span>
                    <Button type="link" onClick={() => setIsAddCategoryModalVisible(true)}>
                        <PlusOutlined />
                    </Button>
                </div>
            ),
            children: (
                <div>
                    <ul>
                        {todos
                            .filter(todo => todo.categories.length === 0)
                            .map(todo => (
                                <li key={todo.id}>
                                    {todo.title}{' '}
                                    <Button type="link" onClick={() => handleAddTodo(null)}>
                                        <PlusOutlined />
                                    </Button>
                                    <Button type="link" onClick={() => handleUpdateTodo(todo.id)}>
                                        <EditOutlined />
                                    </Button>
                                    <Button type="link" onClick={() => handleDeleteTodo(todo.id)}>
                                        <CloseOutlined />
                                    </Button>
                                </li>
                            ))}
                    </ul>
                </div>
            ),
        });
    }

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div>
            <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
            <Modal
                title="Add New Category"
                visible={isAddCategoryModalVisible}
                onOk={handleAddNewCategory}
                onCancel={() => setIsAddCategoryModalVisible(false)}
            >
                <Input
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Todo;
