import { dbGetAllOrders, dbGetOrderById, dbCreateOrder, dbUpdateOrder, dbDeleteOrder, dbGetOrdersByUserId } from '../models/order.js';
import { dbCreateOrderItem, dbGetOrderItemsByOrderId, dbUpdateOrderItem } from '../models/orderItem.js';
import { poolPromise, sql } from '../config/database.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await dbGetAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await dbGetOrderById(req.params.id);
        const orderItems = await dbGetOrderItemsByOrderId(req.params.id);
        res.json({ order, orderItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createOrder = async (req, res) => {
    const { buyer_id, products } = req.body;

    if (!buyer_id || !products || products.length === 0) {
        return res.status(400).json({ error: "Buyer ID and products are required" });
    }

    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {
        // Begin the transaction
        await transaction.begin();

        // Create the order
        const newOrder = { buyer_id, status: 'Pending' };
        const createdOrder = await dbCreateOrder(newOrder, transaction);

        // Create order items
        for (const product of products) {
            const newOrderItem = {
                order_id: createdOrder.id,
                product_id: product.product_id,
                seller_id: product.seller_id,
                quantity: product.quantity,
                status: 'Pending'
            };
            await dbCreateOrderItem(newOrderItem, transaction);
        }

        // Commit the transaction
        await transaction.commit();

        res.status(201).json({ message: "Order created successfully", order: createdOrder });
    } catch (err) {
        // Rollback the transaction in case of any error
        await transaction.rollback();
        res.status(500).json({ error: "Failed to create order: " + err.message });
    }
}


export const updateOrder = async (req, res) => {
    const updatedOrder = {
        status: req.body.status,
    };

    try {
        await dbUpdateOrder(req.params.id, updatedOrder);
        res.json({ message: "Order updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await dbDeleteOrder(req.params.id);
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await dbGetOrdersByUserId(req.params.id);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Order Items
export const createOrderItem = async (req, res) => {
    const { order_id, product_id, seller_id, quantity } = req.body;

    if (!order_id || !product_id || !seller_id || !quantity) {
return res.status(400).json({ error: "Order ID, Product ID, Seller ID, and Quantity are required" });
}

try {
    const newOrderItem = { order_id, product_id, seller_id, quantity, status: 'Pending' };
    const createdOrderItem = await dbCreateOrderItem(newOrderItem);
    res.status(201).json({ message: "Order item created successfully", orderItem: createdOrderItem });
} catch (err) {
    res.status(500).json({ error: "Failed to create order item: " + err.message });
}
}

export const updateOrderItem = async (req, res) => {
const updatedOrderItem = {
    status: req.body.status,
};

try {
    await dbUpdateOrderItem(req.params.id, updatedOrderItem);
    res.json({ message: "Order item updated successfully" });
} catch (err) {
    res.status(500).json({ error: err.message });
}
}

export const deleteOrderItem = async (req, res) => {
try {
    await dbDeleteOrderItem(req.params.id);
    res.json({ message: "Order item deleted successfully" });
} catch (err) {
    res.status(500).json({ error: err.message });
}
}

export const getOrderItemsByOrderId = async (req, res) => {
try {
    const orderItems = await dbGetOrderItemsByOrderId(req.params.orderId);
    res.json(orderItems);
} catch (err) {
    res.status(500).json({ error: err.message });
}
}
