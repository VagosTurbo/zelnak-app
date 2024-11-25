// backend2.0/routes/categoryRoutes.js
import { Router } from "express";
import { Roles } from "../enums/roles.js";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  getCategoryHierarchy,
  updateCategory,
  deleteCategory,
  toggleCategoryApproval,
} from "../controllers/categoryController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

const permissions = {
  getAllCategories: [],
  getCategoryById: [],
  createCategory: [],
  updateCategory: [Roles.Admin, Roles.Moderator],
  deleteCategory: [Roles.Admin, Roles.Moderator],
  toggleApproval: [],
};

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put(
  "/:id",
  authenticateToken(permissions.updateCategory),
  updateCategory
);
router.put("/:id/toggle", toggleCategoryApproval);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.get("/:categoryId/hierarchy", getCategoryHierarchy);

export default router;
