import React, { useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useCurrentUser } from '../context/CurrentUserContext'

const Navbar: React.FC = () => {
    const { authenticated, signOut } = useAuth()
    const { currentUser } = useCurrentUser()
    useEffect(() => {
        console.log(currentUser)
    }, [currentUser])

    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
            <Toolbar>
                {/* App Title */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Zelnak IS
                </Typography>

                {authenticated && currentUser && (
                    <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                        Přihlášen jako: {currentUser.username}
                    </Typography>
                )}

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
