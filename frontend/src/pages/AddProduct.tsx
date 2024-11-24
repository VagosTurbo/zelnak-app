import React, { useState, useEffect, FormEvent } from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import api from '../api/api';
import { LocalStorage } from '../enums';

interface Category {
    id: number;
    name: string;
}

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category_id: '',
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (err: any) {
                setMessage(err.response?.data?.message || 'Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

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
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={formData.category_id}
                            onChange={(e) => handleSetValue('category_id', e.target.value)}
                            label="Category"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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