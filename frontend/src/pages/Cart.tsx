import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { apiPost } from '../api/apiPost'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { LocalStorage } from '../enums'

interface OrderResponse {
    message: string
    order: {
        id: number
        buyer_id: string
        status: string
    }
}

const Cart: React.FC = () => {
    const { authenticated, userId } = useAuth()
    const { cart, updateProductQuantity, clearCart } = useCart()
    const [message, setMessage] = useState<string | null>(null)
    const [totalPrice, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cart.products.reduce(
                (sum, product) => sum + product.price * product.quantity,
                0
            )
            setTotalPrice(total)
        }

        calculateTotalPrice()
    }, [cart.products])

    const handleCreateOrder = async () => {
        if (!authenticated) {
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

            const response = await apiPost<OrderResponse>('/orders', orderData, token)
            console.log('Order response:', response)
            setMessage(response.message || 'Order created successfully!')
            clearCart() // Clear the cart after creating the order
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Failed to create order')
        }
    }

    const handleIncreaseQuantity = (productId: number) => {
        updateProductQuantity(productId, 1)
    }

    const handleDecreaseQuantity = (productId: number) => {
        updateProductQuantity(productId, -1)
    }

    return (
        <Box sx={{ padding: 2 }}>
            {authenticated ? (
                <>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        User ID: {userId}
                    </Typography>
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
                                            color="primary"
                                            onClick={() => handleIncreaseQuantity(product.id)}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDecreaseQuantity(product.id)}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                                Total Price: ${totalPrice.toFixed(2)}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleCreateOrder}>
                                Create Order
                            </Button>
                        </>
                    )}
                    {message && (
                        <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
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
