import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { LocalStorage } from '../enums';

const Navbar: React.FC = () => {
    const isLoggedIn = !!localStorage.getItem(LocalStorage.token); // Check if token exists

    const handleLogout = () => {
        localStorage.removeItem(LocalStorage.token);
        localStorage.removeItem(LocalStorage.UserId);
        window.location.reload();
    };

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
                    <>
                        <Button color="inherit" href="#/profile">
                            Profile
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
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
    );
};

export default Navbar;