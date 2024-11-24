// /routes/userRoutes.js

import { Router } from "express"
import { deleteUser, getAllUsers, getUserById, updateUser, addUserEvent, removeUserEvent, getUserEvents } from "../controllers/userController.js";
import { getProductsByUserId } from "../controllers/productController.js";

const router = Router()

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:userId/events", addUserEvent);
router.delete("/:userId/events", removeUserEvent);
router.get("/:userId/events", getUserEvents);
router.get("/:id/products", getProductsByUserId);

export default router
