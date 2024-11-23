import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '../types/Product'
import { Cart } from '../types/Cart'

const CartContext = createContext<{
    cart: Cart
    addProduct: (id: Product['id'], quantity: number) => void
    removeProduct: (id: Product['id']) => void
    clearCart: () => void
}>({
    cart: { products: [] },
    addProduct: () => {},
    removeProduct: () => {},
    clearCart: () => {},
})

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({ products: [] })

    const addProduct = (id: Product['id'], quantity: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.products.find((p) => p.id === id)
            if (existingProduct) {
                return {
                    ...prevCart,
                    products: prevCart.products.map((p) =>
                        p.id === id ? { ...p, quantity: p.quantity + quantity } : p
                    ),
                }
            }
            return {
                ...prevCart,
                products: [...prevCart.products, { id, quantity }],
            }
        })
    }

    const removeProduct = (id: Product['id']) => {
        setCart((prevCart) => ({
            ...prevCart,
            products: prevCart.products.filter((p) => p.id !== id),
        }))
    }

    const clearCart = () => {
        setCart({ products: [] })
    }

    return (
        <CartContext.Provider value={{ cart, addProduct, removeProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
