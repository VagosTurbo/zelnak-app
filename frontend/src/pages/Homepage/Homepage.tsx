import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
import { Routes } from '../../enums/Routes'
import Layout from '../layouts/Layout'
import { Category } from '../../types/Category'
import { apiGet } from '../../api/apiGet'
import { Product } from '../../types/Product'
import colors from '../../styles/colors'
import { UrlParams } from '../../enums/UrlParams'
import { useCart } from '../../context/CartContext'

const Homepage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [products, setProducts] = useState<Product[]>([])

    const [searchParams] = useSearchParams()
    const { addProduct } = useCart()

    const fetchCategories = async () => {
        try {
            const response = await apiGet<Category[]>('/categories')
            setCategories(response)
        } catch (err: any) {
            console.error('Failed to fetch categories', err)
        }
    }

    const fetchAllProducts = async () => {
        try {
            const response = await apiGet<Product[]>('/products')
            setAllProducts(response)
            setProducts(response)
        } catch (err: any) {
            console.error('Failed to fetch products', err)
        }
    }

    const handleUrlParams = () => {
        const category = searchParams.get('category')
        if (category) {
            setProducts(
                allProducts.filter((product) => product.category_id === parseInt(category, 10))
            )
        } else {
            setProducts(allProducts)
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchAllProducts()
    }, [])

    useEffect(() => {
        handleUrlParams()
    }, [searchParams, allProducts])

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                <nav>
                    <Link to={Routes.Register} style={{ marginRight: '16px' }}>
                        Register
                    </Link>
                    <Link to={Routes.Login} style={{ marginRight: '16px' }}>
                        Login
                    </Link>
                    <Link to={Routes.Products} style={{ marginRight: '16px' }}>
                        All Products
                    </Link>
                    <Link to={Routes.Profile} style={{ marginRight: '16px' }}>
                        Profile
                    </Link>
                    <Link to={Routes.AddProduct} style={{ marginRight: '16px' }}>
                        Add Product
                    </Link>
                    <Link to={Routes.Events} style={{ marginRight: '16px' }}>
                        Events
                    </Link>
                    <Link to={Routes.Categories} style={{ marginRight: '16px' }}>
                        Categories
                    </Link>
                    <Link to={Routes.AddCategory} style={{ marginRight: '16px' }}>
                        Add Category
                    </Link>
                    <Link to="/admin" style={{ marginRight: '16px' }}>
                        Admin Page
                    </Link>
                </nav>
            </Box>

            <Box
                sx={{
                    background: 'black',
                    width: '100%',
                    height: '50px',
                }}>
                separator
            </Box>

            <Typography variant="h1" component="h1" mb={3}>
                Domovská stránka
            </Typography>

            <Typography variant="h1" component="h2" mb={3} textAlign={'center'}>
                Kategorie
            </Typography>
            <Box
                className="all-categories"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 2,
                    mb: 5,
                }}>
                {categories.map((category, index) => (
                    <Card sx={{}} key={index}>
                        <CardContent>
                            <CardActionArea>
                                <Link
                                    to={`?${UrlParams.Category}=${category.id}`}
                                    style={{ textDecoration: 'none' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {category.name}
                                    </Typography>
                                </Link>
                            </CardActionArea>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Typography variant="h1" component="h2" mb={3} textAlign={'center'}>
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
                    <Card sx={{}} key={index}>
                        <CardMedia component="img" height="140" image={product.image} />
                        <CardContent sx={{ height: '100%' }}>
                            <CardActionArea>
                                <Link
                                    to={Routes.Product + '/' + product.id}
                                    style={{ textDecoration: 'none' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h4"
                                        sx={{ color: colors.colorText, textDecoration: 'none' }}>
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
                            <Link to={Routes.Seller + '/' + product.user_id}>
                                <Typography variant="body2" sx={{ color: colors.colorText }} mb={2}>
                                    Prodejce: {product.price} Kč
                                </Typography>
                            </Link>
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
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Layout>
    )
}

export default Homepage
