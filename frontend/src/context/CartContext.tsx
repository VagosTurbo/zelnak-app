import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Cart } from '../types/Cart'
import { Product } from '../types/Product'

const CartContext = createContext<{
    cart: Cart
    addProduct: (id: Product['id'], quantity: number, price: number, sellerId: number) => void
    removeProduct: (id: Product['id']) => void
    updateProductQuantity: (id: Product['id'], quantityChange: number) => void
    clearCart: () => void
}>({
    cart: { products: [] },
    addProduct: () => {},
    removeProduct: () => {},
    updateProductQuantity: () => {},
    clearCart: () => {},
})

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({ products: [] })

    const addProduct = (id: Product['id'], quantity: number, price: number, sellerId: number) => {
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
                products: [...prevCart.products, { id, quantity, price, seller_id: sellerId }],
            }
        })
    }

    const removeProduct = (id: Product['id']) => {
        setCart((prevCart) => ({
            ...prevCart,
            products: prevCart.products.filter((p) => p.id !== id),
        }))
    }

    const updateProductQuantity = (id: Product['id'], quantityChange: number) => {
        setCart((prevCart) => ({
            ...prevCart,
            products: prevCart.products.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + quantityChange } : p
            ),
        }))
    }

    const clearCart = () => {
        setCart({ products: [] })
    }

    return (
        <CartContext.Provider
            value={{ cart, addProduct, removeProduct, updateProductQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
