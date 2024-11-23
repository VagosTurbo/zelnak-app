import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar' // Import the Navbar component
import { Routes } from '../enums/Routes'
import { LocalStorage } from '../enums'

const Homepage: React.FC = () => {
    const userId = localStorage.getItem(LocalStorage.UserId)
    return (
        <div>
            {/* Navbar at the top */}
            <Navbar />

            <Box sx={{ p: 3 }}>
                {' '}
                {/* Padding around the main content */}
                <Typography variant="h1">
                    {/* Check if userId exists and render it */}
                    {userId ? (
                        <span>{userId}</span> // Display userId if logged in
                    ) : (
                        <span>User not logged in</span> // Show a message if not logged in
                    )}
                </Typography>
                <Typography variant="h2">H2</Typography>
                <Typography variant="h3">H3</Typography>
                <Typography variant="body1">Body 1</Typography>
                <Typography variant="body2">Body 2</Typography>
                <Box sx={{ height: '64px', width: '96px', backgroundColor: 'primary.main' }}>
                    Primary color
                </Box>
                <Box
                    sx={{
                        height: '64px',
                        width: '96px',
                        backgroundColor: 'secondary.main',
                        color: '#fff',
                    }}>
                    Secondary color
                </Box>
                <Box
                    sx={{ height: '64px', width: '96px', backgroundColor: '#fff', color: 'black' }}>
                    White color
                </Box>
                <Typography variant="h1" sx={{ mt: 4 }}>
                    Welcome to the Homepage
                </Typography>
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
        </div>
    )
}

export default Homepage
