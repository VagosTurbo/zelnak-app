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
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        user_id: req.body.user_id,
        image: req.body.image,
    };
    try {
        await dbCreateProduct(newProduct);
        res.json({ message: "Product created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateProduct = async (req, res) => {
    const updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        user_id: req.body.user_id,
    };
    try {
        await dbUpdateProduct(req.params.id, updatedProduct);
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
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