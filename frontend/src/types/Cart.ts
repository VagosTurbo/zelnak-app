import { Product } from './Product'

export interface Cart {
    products: {
        id: Product['id']
        quantity: number
    }[]
}
