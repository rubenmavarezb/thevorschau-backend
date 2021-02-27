import User from '../models/User';
import { Request, Response } from 'express';
//////////////////////////////////////////////////////


export const getCart = async (req: Request, res: Response) => {
    console.log('Desde getCart');
    console.log(req.body)
}

export const addToCart = async (req: Request, res: Response) => {
    console.log('Desde addToCart');
    console.log(req.body)
}

export const updateItemInCart = async (req: Request, res: Response) => {
    console.log('Desde updateItemInCart');
    console.log(req.body)
}

export const deleteItemInCart = async (req: Request, res: Response) => {
    console.log('Desde deleteItemInCart');
    console.log(req.body)
}