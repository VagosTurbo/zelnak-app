import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { apiGet } from '../api/apiGet'

interface Product {
    id: number
    name: string
    price: number
    description: string
    image: string
    user_id: number
    category_id: number
    created_at: string
}

interface User {
    id: number
    username: string
    email: string
}

interface Category {
    id: number
    name: string
    parent_id: number | null
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [users, setUsers] = useState<{ [key: number]: User }>({})
    const [categories, setCategories] = useState<{ [key: number]: Category[] }>({})
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiGet('/products')
                setProducts(response)

                // Fetch user details for each product
                const userIds = Array.from(new Set(response.map((product: Product) => product.user_id)))
                const userResponses = await Promise.all(userIds.map((id) => apiGet(`/users/${id}`)))
                const usersData = userResponses.reduce((acc, user) => {
                    acc[user.id] = user
                    return acc
                }, {} as { [key: number]: User })
                setUsers(usersData)

                // Fetch category hierarchy for each product
                const categoryIds = Array.from(new Set(response.map((product: Product) => product.category_id)))
                const categoryResponses = await Promise.all(categoryIds.map((id) => apiGet(`/categories/${id}/hierarchy`)))
                const categoriesData = categoryResponses.reduce((acc, hierarchy, index) => {
                    acc[categoryIds[index]] = hierarchy
                    return acc
                }, {} as { [key: number]: Category[] })
                setCategories(categoriesData)
            } catch (err: any) {
                console.error('Error fetching products:', err)
                setError(err.response?.data?.message || 'Failed to fetch products')
            }
        }

        fetchProducts()
    }, [])

    const handleFarmerClick = (farmerId: number) => {
        navigate(`/farmers/${farmerId}`)
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {products.map((product) => (
                    <Card key={product.id} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.image !== 'x' ? product.image : '/apple-touch-icon.png'} // if no image then random placeholder
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Price: ${product.price}
                            </Typography>
                            {users[product.user_id] && (
                                <Typography variant="body2" color="text.secondary">
                                    Seller: <Link component="button" onClick={() => handleFarmerClick(users[product.user_id].id)}>{users[product.user_id].username}</Link>
                                </Typography>
                            )}
                            {categories[product.category_id] && (
                                <Typography variant="body2" color="text.secondary">
                                    Categories: {categories[product.category_id].map(cat => cat.name).join(' > ')}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default ProductsPage