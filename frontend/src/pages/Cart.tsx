import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { apiPost } from '../api/apiPost'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { LocalStorage } from '../enums/LocalStorage'
import { Order } from '../types/Order'

const Cart: React.FC = () => {
    const { cart, removeProduct, clearCart } = useCart()
    const { authenticated, userId } = useAuth()
    const [message, setMessage] = React.useState<string | null>(null)

    const handleCreateOrder = async () => {
        if (!userId) {
            setMessage('User is not authenticated')
            return
        }

        const token = localStorage.getItem(LocalStorage.token)
        if (!token) {
            setMessage('User is not authenticated')
            return
        }

        try {
            const orderData = {
                buyer_id: userId,
                products: cart.products.map((product) => ({
                    product_id: product.id,
                    seller_id: product.seller_id, // Ensure seller_id is included in the product data
                    quantity: product.quantity,
                })),
            }

            const response = await apiPost<Order[]>('/orders', orderData, token)
            setMessage('Order created successfully!')
            clearCart() // Clear the cart after creating the order
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Failed to create order')
        }
    }

    return (
        <Box sx={{ padding: 2 }}>
            {authenticated ? (
                <>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        User ID: {userId}
                    </Typography>
                    {/* Test addProduct */}
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
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => removeProduct(product.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={clearCart}
                                sx={{ mt: 2 }}>
                                Clear Cart
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateOrder}
                                sx={{ mt: 2 }}>
                                Create Order
                            </Button>
                        </>
                    )}
                    {message && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {message}
                        </Typography>
                    )}
                </>
            ) : (
                <Typography variant="body1">Please log in to view your cart.</Typography>
            )}
        </Box>
    )
}

export default Cart
