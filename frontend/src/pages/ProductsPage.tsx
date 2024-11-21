import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import api from '../api/api'

interface Product {
    id: number
    name: string
    price: number
    description: string
    image: string
    user_id: number
    created_at: string
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')
                setProducts(response.data)
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch products')
            }
        }

        fetchProducts()
    }, [])

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
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default ProductsPage
