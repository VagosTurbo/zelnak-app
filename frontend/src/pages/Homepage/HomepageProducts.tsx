import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
} from '@mui/material'
import { Product } from '../../types/Product'
import { Routes } from '../../enums'
import colors from '../../styles/colors'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useCurrentUser } from '../../context/CurrentUserContext'

interface HomepageProductsProps {
    products: Product[]
}

export const HomepageProducts: React.FC<HomepageProductsProps> = ({ products }) => {
    const { addProduct } = useCart()
    const { authenticated } = useAuth()

    return (
        <>
            <Typography variant="h1" component="h2" mb={3} textAlign="center">
                Produkty
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
                                Kategorie: {product.category_id}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                Cena: {product.price} Kč
                            </Typography>
                            <Link to={`${Routes.Seller}/${product.user_id}`}>
                                <Typography variant="body2" sx={{ color: colors.colorText }} mb={2}>
                                    Prodejce: {product.user_id}
                                </Typography>
                            </Link>
                            {authenticated ? (
                                <Button
                                    onClick={() => addProduct(product.id, 1)}
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        mt: 'auto',
                                    }}
                                    fullWidth>
                                    Přidat do košíku
                                </Button>
                            ) : (
                                <Typography variant="body2" sx={{ color: colors.colorText }} mb={2}>
                                    Pro nákup se musíte přihlásit
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    )
}
