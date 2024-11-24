import React, { useEffect, useState } from 'react'
import { Box, Typography, Link } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { apiGet } from '../api/apiGet'
import Layout from './layouts/Layout'
import { HomepageProducts } from './Homepage/HomepageProducts'
import { HomepageEvents } from './Homepage/HomepageEvents'
import { Product } from '../types/Product'
import { Event } from '../types/Event'
import { User } from '../types/User'

const FarmerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [farmer, setFarmer] = useState<User | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [error, setError] = useState<string | null>(null)

    const [searchParams] = useSearchParams()

    const fetchFarmer = async () => {
        try {
            const response = await apiGet<User>(`/users/${id}`)
            setFarmer(response)
        } catch (err: any) {
            setError('Failed to fetch farmer profile')
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await apiGet<Product[]>(`/users/${id}/products`)
            setProducts(response)
        } catch (err: any) {
            setError('Failed to fetch products')
        }
    }

    const fetchEvents = async () => {
        try {
            const response = await apiGet<Event[]>(`/users/${id}/events`)
            setEvents(response)
        } catch (err: any) {
            setError('Failed to fetch events')
        }
    }

    const handleUrlParams = () => {
        const category = searchParams.get('category')
        if (category) {
            setProducts(
                products.filter((product) => product.category_id === parseInt(category, 10))
            )
        }
    }

    useEffect(() => {
        fetchFarmer()
        fetchProducts()
        fetchEvents()
    }, [id])

    useEffect(() => {
        handleUrlParams()
    }, [searchParams, products])

    if (error) {
        return <Typography color="error">{error}</Typography>
    }

    if (!farmer) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Layout>
            <Box
                sx={{
                    background: 'primary',
                    width: '100%',
                    height: '50px',
                }}></Box>

            <Typography variant="h1" component="h1" mb={3}>
                Farmer Profile: {farmer.username}
            </Typography>
            <Typography variant="h5" component="div">
                Email: {farmer.email}
            </Typography>

            {/* Display Products */}
            <HomepageProducts products={products} />

            {/* Display Events */}
            <HomepageEvents events={events} users={[farmer]} showAddButton={false} />
        </Layout>
    )
}

export default FarmerProfile
