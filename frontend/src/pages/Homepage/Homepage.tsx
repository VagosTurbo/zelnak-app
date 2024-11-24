import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiGet } from '../../api/apiGet'
import { Routes } from '../../enums/Routes'
import { Category } from '../../types/Category'
import { Product } from '../../types/Product'
import Layout from '../layouts/Layout'
import { HomepageCategories } from './HomepageCategories'
import { HomepageProducts } from './HomepageProducts'
import { HomepageEvents } from './HomepageEvents'
import { Event } from '../../types/Event'
import { User } from '../../types/User'

const Homepage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [users, setUsers] = useState<User[]>([])

    const [searchParams] = useSearchParams()

    const fetchCategories = async () => {
        try {
            const response = await apiGet<Category[]>('/categories')
            const approvedCategories = response.filter((category) => category.is_approved)
            setCategories(approvedCategories)
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

    const fetchEvents = async () => {
        try {
            const response = await apiGet<Event[]>('/events')
            setEvents(response)
        } catch (err: any) {
            console.error('Failed to fetch events', err)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await apiGet<User[]>('/users')
            console.log(response)
            setUsers(response)
        } catch (err: any) {
            console.error('Failed to fetch users', err)
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
        fetchEvents()
        fetchUsers()
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
            <HomepageCategories categories={categories} />
            <HomepageProducts products={products} />
            <HomepageEvents events={events} users={users} />
        </Layout>
    )
}

export default Homepage
