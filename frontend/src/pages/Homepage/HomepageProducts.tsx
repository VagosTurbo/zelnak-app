import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { Routes } from '../../enums'
import colors from '../../styles/colors'
import { Product } from '../../types/Product'

interface HomepageProductsProps {
    products: Product[]
}

export const HomepageProducts: React.FC<HomepageProductsProps> = ({ products }) => {
    const { addProduct } = useCart()
    const { authenticated } = useAuth()

    return (
        <>
            <Typography variant="h1" component="h2" mb={3} textAlign="center">
                Products
            </Typography>
            <Box
                className="all-products"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 2,
                    mb: 5,
                }}>
                {products.map((product, index) => (
                    <Card key={index}>
                        <CardMedia component="img" height="140" image={product.image} />
                        <CardContent>
                            <CardActionArea>
                                <Link
                                    to={`${Routes.Products}/${product.id}`}
                                    style={{ textDecoration: 'none' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h4"
                                        sx={{ color: colors.colorText }}>
                                        {product.name}
                                    </Typography>
                                </Link>
                            </CardActionArea>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                {product.description}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                Category: {product.category_id}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                Price: {product.price} Kč
                            </Typography>
                            <Link to={`${Routes.Seller}/${product.user_id}`}>
                                <Typography variant="body2" sx={{ color: colors.colorText }} mb={2}>
                                    Seller: {product.user_id}
                                </Typography>
                            </Link>
                            {authenticated ? (
                                <Button
                                    onClick={() => {
                                        console.log('Product price', product.price)
                                        addProduct(product.id, 3, product.price, product.user_id)
                                    }}
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        mt: 'auto',
                                    }}
                                    fullWidth>
                                    Add to cart
                                </Button>
                            ) : (
                                <Typography variant="body2" sx={{ color: colors.colorText }} mb={2}>
                                    You have have to login first.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    )
}
