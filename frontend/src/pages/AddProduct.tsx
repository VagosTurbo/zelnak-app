import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import api from '../api/api'
import { apiPost } from '../api/apiPost'
import { ZelnakButton } from '../components/ZelnakButton'
import { useAuth } from '../context/AuthContext'
import { useCurrentUser } from '../context/CurrentUserContext'
import Layout from './layouts/Layout'
import ZelnakBox from './layouts/ZelnakBox'

interface Category {
    id: number
    name: string
}

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category_id: '',
        quantity: 0,
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [message, setMessage] = useState('')
    const { accessToken } = useAuth()
    const { currentUser } = useCurrentUser()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories')
                setCategories(response.data)
            } catch (err: any) {
                setMessage(err.response?.data?.message || 'Failed to fetch categories')
            }
        }

        fetchCategories()
    }, [])

    const handleSetValue = (key: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const userId = currentUser?.id
            if (!accessToken || !userId) {
                setMessage('User is not authenticated')
                return
            }
            const response = await apiPost<any>(
                '/products',
                {
                    ...formData,
                    user_id: userId, // Include user_id in the request payload
                },
                accessToken
            )
            setMessage(response.message || 'Product added successfully!')
        } catch (error: any) {
            setMessage(error.message || 'Error occurred')
        }
    }

    return (
        <Layout>
            <ZelnakBox>
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
                            label="Category">
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Quantity Avaliable"
                        variant="outlined"
                        fullWidth
                        value={formData.quantity}
                        onChange={(e) => handleSetValue('quantity', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <ZelnakButton color="primary" type="submit" fullWidth>
                        Add Product
                    </ZelnakButton>
                </form>
                {message && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </ZelnakBox>
        </Layout>
    )
}

export default AddProduct
