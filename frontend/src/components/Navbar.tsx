import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useCurrentUser } from '../context/CurrentUserContext'
import { Link } from 'react-router-dom'
import { Routes } from '../enums'

const Navbar: React.FC = () => {
    const { authenticated, signOut } = useAuth()
    const { currentUser, isCustomer, isRegisteredUser, isAdmin } = useCurrentUser()

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

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <MyLink to={Routes.Homepage} text="Home" />
                </Box>
                {authenticated ? (
                    <>
                        <MyLink to={Routes.Profile} text="Profile and orders" />
                        <Button color="inherit" onClick={signOut}>
                            Logout
                        </Button>
                        {isRegisteredUser ||
                            (isCustomer && <MyLink to={Routes.Cart} text="Cart" />)}
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

                {isAdmin && (
                    <Link to={Routes.AdminPage} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                mx: 1,
                            }}>
                            Admin dashboard
                        </Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    )
}

const MyLink = ({ to, text }: { to: string; text: string }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button color="inherit">{text}</Button>
    </Link>
)

export default Navbar
