// frontend/src/pages/AddCategory.tsx
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, Button, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { Routes } from '../enums/Routes'

interface Category {
    id: number
    name: string
}

const AddCategory: React.FC = () => {
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState<number | null>(null)
    const [attributes, setAttributes] = useState([{ name: '', isRequired: false }])
    const [categories, setCategories] = useState<Category[]>([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories')
                setCategories(response.data)
            } catch (err: any) {
                console.error('Failed to fetch categories', err)
            }
        }

        fetchCategories()
    }, [])

    const handleAttributeChange = (index: number, key: string, value: string | boolean) => {
        const newAttributes = [...attributes]
        newAttributes[index] = { ...newAttributes[index], [key]: value }
        setAttributes(newAttributes)
    }

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', isRequired: false }])
    }

    const handleRemoveAttribute = (index: number) => {
        const newAttributes = attributes.filter((_, i) => i !== index)
        setAttributes(newAttributes)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // Creating the data in the desired format
        const categoryData = {
            name: categoryName,
            parent_id: parentCategoryId,
            attributes: attributes.map((attr) => ({
                name: attr.name,
                is_required: attr.isRequired,
            })),
        }

        try {
            // Posting the data to the API
            const response = await api.post('/categories', categoryData)

            // Displaying a success message
            setMessage(response.data.toString() || 'Category created successfully!')
            navigate(Routes.Categories)
        } catch (error: any) {
            // Handling error
            setMessage(error.response?.data?.message || 'Error occurred')
        }
    }

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
                    Add Category
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        fullWidth
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Parent Category"
                        variant="outlined"
                        fullWidth
                        select
                        value={parentCategoryId || ''}
                        onChange={(e) =>
                            setParentCategoryId(e.target.value ? parseInt(e.target.value) : null)
                        }
                        sx={{ mb: 2 }}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography variant="h6" gutterBottom>
                        Attributes
                    </Typography>
                    {attributes.map((attribute, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <TextField
                                label="Attribute Name"
                                variant="outlined"
                                fullWidth
                                value={attribute.name}
                                onChange={(e) =>
                                    handleAttributeChange(index, 'name', e.target.value)
                                }
                                sx={{ mr: 2 }}
                            />
                            <TextField
                                label="Required"
                                variant="outlined"
                                fullWidth
                                select
                                SelectProps={{ native: true }}
                                value={attribute.isRequired ? 'true' : 'false'}
                                onChange={(e) =>
                                    handleAttributeChange(
                                        index,
                                        'isRequired',
                                        e.target.value === 'true'
                                    )
                                }
                                sx={{ mr: 2 }}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </TextField>
                            <IconButton onClick={() => handleRemoveAttribute(index)}>
                                <RemoveCircleOutline />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        variant="outlined"
                        onClick={handleAddAttribute}
                        startIcon={<AddCircleOutline />}
                        sx={{ mb: 2 }}>
                        Add Attribute
                    </Button>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Add Category
                    </Button>
                </form>
                {message && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default AddCategory
