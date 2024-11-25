import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { apiGet } from '../api/apiGet'
import { useCurrentUser } from '../context/CurrentUserContext'
import { Event } from '../types/Event'
import { Product } from '../types/Product'
import { User } from '../types/User'
import { HomepageEvents } from './Homepage/HomepageEvents'
import { HomepageProducts } from './Homepage/HomepageProducts'
import Layout from './layouts/Layout'

const FarmerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [farmer, setFarmer] = useState<User | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [error, setError] = useState<string | null>(null)

    const { currentUser } = useCurrentUser()

    const isMyProfile = () => {
        if (!id) return false

        return currentUser?.id === parseInt(id, 10)
    }

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
            <HomepageProducts products={products} allowDelete={isMyProfile()} />

            {/* Display Events */}
            <HomepageEvents
                events={events}
                users={[farmer]}
                showAddButton={false}
                allowDelete={isMyProfile()}
            />
        </Layout>
    )
}

export default FarmerProfile
