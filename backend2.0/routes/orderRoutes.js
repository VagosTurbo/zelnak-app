import { Router } from "express";
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, getOrdersByUserId, getOrderItemsByOrderId, createOrderItem, updateOrderItem, deleteOrderItem, approveOrderItem } from "../controllers/orderController.js";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/user/:id", getOrdersByUserId);

router.post("/:orderId/items", createOrderItem);
router.get("/:orderId/items", getOrderItemsByOrderId);
router.put("/items/:id", updateOrderItem);
router.delete("/items/:id", deleteOrderItem);


// approve order item
router.put("/items/:id/approve", approveOrderItem);


export default router;