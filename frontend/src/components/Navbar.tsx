import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { LocalStorage } from '../enums'

const Navbar: React.FC = () => {
    const handleLogout = () => {
        // Remove the token from localStorage and redirect to login (if needed)
        localStorage.removeItem(LocalStorage.token)
        localStorage.removeItem(LocalStorage.UserId)
        window.location.href = '/login'
    }

    const isLoggedIn = !!localStorage.getItem(LocalStorage.token) // Check if token exists

    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
            <Toolbar>
                {/* App Title */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Zelnak IS
                </Typography>

                {/* Navigation Links */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" href="/">
                        Home
                    </Button>
                    <Button color="inherit" href="/about">
                        About
                    </Button>
                </Box>
                {isLoggedIn ? (
                    <Button color="inherit" href="#/profile">
                        Profile
                    </Button>
                ) : (
                    <Button color="inherit" href="#/register">
                        Register
                    </Button>
                )}
                {/* Login/Logout Button */}
                {isLoggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <Button color="inherit" href="#/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
