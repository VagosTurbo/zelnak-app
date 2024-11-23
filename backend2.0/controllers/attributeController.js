// backend2.0/controllers/attributeController.js
import { dbCreateAttribute, dbGetAttributesByCategoryId } from "../models/attribute.js";

export const createAttribute = async (req, res) => {
    const newAttribute = {
        name: req.body.name,
        is_required: req.body.is_required,
        category_id: req.body.category_id,
    };
    try {
        const attribute = await dbCreateAttribute(newAttribute);
        res.json({ message: "Attribute created successfully", attribute });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAttributesByCategoryId = async (req, res) => {
    try {
        const attributes = await dbGetAttributesByCategoryId(req.params.categoryId);
        res.json(attributes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}