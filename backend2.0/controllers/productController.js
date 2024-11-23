import { dbGetAllProducts, dbCreateProduct, dbDeleteProduct, dbGetProductById, dbUpdateProduct } from "../models/product.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await dbGetAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await dbGetProductById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, user_id, category_id } = req.body;

        if (!name || !price || !description || !user_id || !category_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const productCreated = await dbCreateProduct({ name, price, description, image, user_id, category_id });

        if (productCreated) {
            res.status(201).json({ message: "Product created successfully" });
        } else {
            res.status(500).json({ error: "Failed to create product" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to create product: " + err.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = {};

        if (req.body.name) updatedProduct.name = req.body.name;
        if (req.body.price) updatedProduct.price = req.body.price;
        if (req.body.description) updatedProduct.description = req.body.description;
        if (req.body.image) updatedProduct.image = req.body.image;
        if (req.body.category_id) updatedProduct.category_id = req.body.category_id;

        if (Object.keys(updatedProduct).length === 0) {
            return res.status(400).json({ error: "At least one field is required to update" });
        }

        const existingProduct = await dbGetProductById(productId);

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        const productUpdated = await dbUpdateProduct(productId, updatedProduct);

        if (productUpdated) {
            res.json({ message: "Product updated successfully" });
        } else {
            res.status(500).json({ error: "Failed to update product" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to update product: " + err.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await dbDeleteProduct(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}