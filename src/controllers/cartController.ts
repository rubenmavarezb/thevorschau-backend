import { Request, Response } from 'express';
import { ObjectId } from 'mongoose'
///////////////////////////////////////////////////////
import User from '../models/User';
import Product from '../models/Product';
import Cart from '../models/Cart';
//////////////////////////////////////////////////////



export const getCart = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        const userCart = await Cart.findOne({ owner:id });
        
        if(!userCart) {
           return res.status(400).json({msg: 'You need to login o create an account in order to see your cart!'});
        }

        res.status(200).json({cart: userCart.products, id:userCart._id});
    } catch (error) {
        console.log(error);
    }

}

export const addToCart = async (req: Request, res: Response) => {

    const { id, prodID, quantity } = req.body;
    let userCart = await Cart.findOne({ owner:id });
    let product = await Product.findById(prodID);

    try {

        if(product) product.quantity = quantity;

        if(!userCart) {

            const data = {
                owner: id,
                products: [product]
            }
    
            const newCart = await Cart.create(data);
            await newCart.save();
            return res.status(200).json({msg:'Product added to the cart!'})
        }

        userCart.products.push(product);
        await userCart.save();
        res.status(200).json({msg:'Product added!'})


    } catch (error) {
        console.log(error)
    }
}

export const updateItemInCart = async (req: Request, res: Response) => {
    console.log(req.body);
    const { cartID } = req.body
    const { id } = req.params;
}

export const deleteItemInCart = async (req: Request, res: Response) => {
    console.log(req.body);
    const { cartID } = req.body;
    const { id } = req.params;

    try {

        let cartUser = await Cart.findById(cartID);
        
        if(!cartUser) {
            return res.status(404).json({msg: "There was an error!"})
        }

        let prueba = cartUser.products.find(product => product["_id"] === id);
        console.log(prueba)
        
       

        return null;

        //await cartUser.save();
        return res.status(200).json({msg: "Product deleted!"})
        
        

    } catch (error) {
        console.log(error);
    }
}

export const deleteCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        
    } catch (error) {
        console.log(error);
    }
}