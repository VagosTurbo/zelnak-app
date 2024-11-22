// frontend/src/pages/AddProduct.tsx
import React, { useState, FormEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../enums';

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSetValue = (key: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem(LocalStorage.token);
            const userId = localStorage.getItem(LocalStorage.UserId);
            if (!token || !userId) {
                setMessage('User is not authenticated');
                return;
            }
            const response = await api.post('/products', {
                ...formData,
                user_id: userId, // Include user_id in the request payload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(response.data.message || 'Product added successfully!');
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}>
            <Box
                sx={{
                    width: 400,
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleSetValue('name', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        value={formData.price}
                        onChange={(e) => handleSetValue('price', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={formData.description}
                        onChange={(e) => handleSetValue('description', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        value={formData.image}
                        onChange={(e) => handleSetValue('image', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Add Product
                    </Button>
                </form>
                {message && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default AddProduct;