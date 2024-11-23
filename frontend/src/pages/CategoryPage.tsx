// frontend/src/pages/CategoriesPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import api from '../api/api';

interface Category {
    id: number;
    name: string;
    parent_id: number | null;
}

interface Attribute {
    id: number;
    name: string;
    is_required: boolean;
    category_id: number;
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (err: any) {
                console.error('Failed to fetch categories', err);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory !== null) {
            const fetchAttributes = async () => {
                try {
                    const response = await api.get(`/attributes/category/${selectedCategory}`);
                    setAttributes(response.data);
                } catch (err: any) {
                    console.error('Failed to fetch attributes', err);
                }
            };

            fetchAttributes();
        }
    }, [selectedCategory]);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem button key={category.id} onClick={() => setSelectedCategory(category.id)}>
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
            {selectedCategory && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Attributes for Selected Category
                    </Typography>
                    <List>
                        {attributes.map((attribute) => (
                            <ListItem key={attribute.id}>
                                <ListItemText primary={attribute.name} secondary={attribute.is_required ? 'Required' : 'Optional'} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default CategoriesPage;