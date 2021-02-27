import Product from '../models/Product';
import { Request, Response } from 'express';
//////////////////////////////////////////////////////

export const getAllProducts = async (req: Request, res: Response) => {
    console.log('Desde getAllProducts');
    console.log(req.body)
}

export const getProductById = async (req: Request, res: Response) => {
    console.log('Desde getProductById');
    console.log(req.params)
}

export const getProductsByCategory = async (req: Request, res: Response) => {
    console.log('Desde getProductsByCategory');
    console.log(req.params)
}