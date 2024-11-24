import React from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { useAuth } from '../context/AuthContext'

const Navbar: React.FC = () => {
    const { authenticated, signOut } = useAuth()

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
                {authenticated ? (
                    <>
                        <Button color="inherit" href="#/profile">
                            Profile
                        </Button>
                        <Button color="inherit" onClick={signOut}>
                            Logout
                        </Button>
                        <Button color="inherit" href="#/cart">
                            Cart
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" href="#/register">
                            Register
                        </Button>
                        <Button color="inherit" href="#/login">
                            Login
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
