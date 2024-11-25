import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../../api/apiGet'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useCurrentUser } from '../../context/CurrentUserContext'
import { Routes } from '../../enums'
import colors from '../../styles/colors'
import { Category } from '../../types/Category'
import { Product } from '../../types/Product'

interface HomepageProductsProps {
    products: Product[]
}

/**
 * vytpsat quantity , jiz se vraci
 * seller name vypsat, kubo nejdriv prida
 */

export const HomepageProducts: React.FC<HomepageProductsProps> = ({ products }) => {
    const { addProduct } = useCart()
    const { authenticated } = useAuth()
    const { isFarmer } = useCurrentUser()

    const [categories, setCategories] = useState<{ [key: number]: Category[] }>({})
    const [productMessage, setProductMessage] = useState<{
        productId: number | null
        message: string
    } | null>({
        productId: null,
        message: '',
    })

    const fetchCategoriesTree = async () => {
        try {
            const categoryIds = Array.from(
                new Set(products.map((product: Product) => product.category_id))
            )
            const categoryResponses = await Promise.all(
                categoryIds.map((id) => apiGet<any>(`/categories/${id}/hierarchy`))
            )
            const categoriesData = categoryResponses.reduce((acc, hierarchy, index) => {
                ;(acc as any)[categoryIds[index] as any] = hierarchy
                return acc
            }, {} as { [key: number]: Category[] })
            setCategories(categoriesData)
        } catch (err: any) {
            console.error('Failed to fetch categories', err)
        }
    }

    useEffect(() => {
        if (products.length && products.length > 0) {
            fetchCategoriesTree()
        }
    }, [products])

    const handleProductMessage = (productId: number, message: string) => {
        setProductMessage({ productId, message })
        setTimeout(() => {
            setProductMessage(null)
        }, 3000)
    }

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
                            {categories[product.category_id] && (
                                <Typography variant="body2" sx={{ color: colors.colorText }}>
                                    Categories:{' '}
                                    {categories[product.category_id]
                                        .map((cat) => cat.name)
                                        .join(' > ')}
                                </Typography>
                            )}
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                Price: {product.price} Kč
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                Quantity: {product.quantity}
                            </Typography>
                            <Link to={`${Routes.Seller}/${product.user_id}`}>
                                <Typography variant="body2" sx={{ color: colors.colorText }} mb={2}>
                                    Seller: {product.username}
                                </Typography>
                            </Link>
                            {authenticated ? (
                                <>
                                    <Button
                                        onClick={() => {
                                            addProduct(
                                                product.id,
                                                3,
                                                product.price,
                                                product.user_id,
                                                product.username
                                            )
                                            handleProductMessage(product.id, 'Added to cart')
                                        }}
                                        color="secondary"
                                        variant="contained"
                                        sx={{
                                            mt: 'auto',
                                        }}
                                        disabled={product.quantity === 0 || isFarmer}
                                        fullWidth>
                                        Add to cart
                                    </Button>
                                    {productMessage?.message &&
                                        productMessage.productId === product.id && (
                                            <Typography
                                                variant="body1"
                                                textAlign={'center'}
                                                sx={{ color: 'success.main' }}
                                                mt={2}>
                                                {productMessage.message}
                                            </Typography>
                                        )}
                                </>
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
