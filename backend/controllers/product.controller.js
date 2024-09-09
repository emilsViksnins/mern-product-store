import mongoose from "mongoose";
import Product from "../models/product.model.js"; // Removed duplicate import

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
  
    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }
    const newProduct = new Product(product);
  
    try {
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Error in Create product:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }  // Closing brace for createProduct was missing here
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
      const product = await Product.findByIdAndDelete(id);
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }
  
      res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      console.log("Error in deleting product:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
};
