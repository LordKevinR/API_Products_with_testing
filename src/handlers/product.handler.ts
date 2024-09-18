import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ data: products });
  } catch (error) {}
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const products = await Product.findByPk(req.params.id);
    if (!products) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ data: products });
  } catch (error) {}
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {}
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await product.update(req.body);
    await product.save();
    res.json({ data: product });
  } catch (error) {}
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    product.availability = !product.availability;
    await product.save();
    res.json({ data: product });
  } catch (error) {}
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await product.destroy();
    res.json({ data: "Product deleted" });
  } catch (error) {}
};
