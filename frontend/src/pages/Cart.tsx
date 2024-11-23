import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart: React.FC = () => {
    const { cart, removeProduct, clearCart, addProduct } = useCart();
    const { authenticated, userId } = useAuth();

    return (
        <Box sx={{ padding: 2 }}>
            {authenticated ? (
                <>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        User ID: {userId}
                    </Typography>
                    {/* Test addProduct */}
                    <Button variant="contained" color="primary" onClick={() => addProduct(1, 1)}>
                        Add Product 1
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => addProduct(2, 1)}>
                        Add Product 2
                    </Button>

                    <Typography variant="h4" component="h1" gutterBottom>
                        Shopping Cart
                    </Typography>
                    {cart.products.length === 0 ? (
                        <Typography variant="body1">Your cart is empty.</Typography>
                    ) : (
                        <>
                            <List>
                                {cart.products.map((product) => (
                                    <ListItem key={product.id}>
                                        <ListItemText
                                            primary={`Product ID: ${product.id}`}
                                            secondary={`Quantity: ${product.quantity}`}
                                        />
                                        <IconButton edge="end" aria-label="delete" onClick={() => removeProduct(product.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="contained" color="secondary" onClick={clearCart} sx={{ mt: 2 }}>
                                Clear Cart
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <Typography variant="body1">Please log in to view your cart.</Typography>
            )}
        </Box>
    );
};

export default Cart;