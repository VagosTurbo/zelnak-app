// backend2.0/routes/categoryRoutes.js
import { Router } from "express";
import { getAllCategories, getCategoryById, createCategory, getCategoryHierarchy } from "../controllers/categoryController.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.get("/:categoryId/hierarchy", getCategoryHierarchy);


export default router;