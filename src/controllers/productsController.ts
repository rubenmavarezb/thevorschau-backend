import Product from '../models/Product';
///////////////////////////////////////////////////////
import { Request, Response } from 'express';
//////////////////////////////////////////////////////

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json({products: products});
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "There was a mistake uploading the products"});
    }
}

export const getProductById = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        res.status(200).json({product: product});
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "There was a mistake uploading the product"});
    }
}

export const getProductsByCategory = async (req: Request, res: Response) => {

    const { category } = req.params;

    try {
        const products = await Product.find({category})
        res.status(200).json({products: products});
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "There was a mistake uploading the product"});
    }
}

export const addProduct = async (req: Request, res: Response) => {
    console.log(req.body)

    let prod = new Product(req.body);

    try {
        await prod.save();
        res.status(200).json({msg: 'Product created'});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'No se pudo cargar el producto'});
    }
}