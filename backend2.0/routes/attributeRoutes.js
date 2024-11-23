// backend2.0/routes/attributeRoutes.js
import { Router } from "express";
import { createAttribute, getAttributesByCategoryId } from "../controllers/attributeController.js";

const router = Router();

router.post("/", createAttribute);
router.get("/category/:categoryId", getAttributesByCategoryId);

export default router;