// backend2.0/controllers/categoryController.js
import { dbGetAllCategories, dbGetCategoryById, dbCreateCategory, dbGetCategoryHierarchy } from "../models/category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await dbGetAllCategories();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await dbGetCategoryById(req.params.id);
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createCategory = async (req, res) => {
    const newCategory = {
        name: req.body.name,
        parent_id: req.body.parent_id,
    };
    try {
        const category = await dbCreateCategory(newCategory);
        res.json({ message: "Category created successfully", category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getCategoryHierarchy = async (req, res) => {
    try {
        const hierarchy = await dbGetCategoryHierarchy(req.params.categoryId);
        res.json(hierarchy);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}