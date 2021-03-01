import { Request, Response } from 'express';
///////////////////////////////////////////////////////
import User from '../models/User';
import Product from '../models/Product';
import Cart from '../models/Cart';
//////////////////////////////////////////////////////



export const getCart = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        const userCart = await Cart.findOne({ owner:id });
        console.log(userCart)
        if(userCart) {
            res.status(200).json({cart: userCart.products, id:userCart._id});
        } else {
            res.status(400).json({msg: 'You need to login o create an account in order to see your cart!'});
        }
    } catch (error) {
        console.log(error);
    }

}

export const addToCart = async (req: Request, res: Response) => {
    console.log(req.body);
    const { id, prodID, quantity } = req.body;

    try {
        let userCart = await Cart.findOne({ owner:id });
        let product = await Product.findById(prodID);

        product!.quantity = quantity;

        if(userCart){
            if(userCart.products.indexOf(product)) {
                console.log('entro en true')

                if(product!.quantity > product!.stock) {

                    product!.quantity = product!.stock
                    await userCart.save();

                    return res.status(400).json({msg:'There is no more in stock!'})
                }

                await userCart.save();

                return res.status(200).json({msg:'Product modified!'})
            } else {

                userCart.products.push(product);

                await userCart.save();

                return res.status(200).json({msg:'Product added!'})
            }

        } else {

            const data = {
                owner: id,
                products: [product]
            }
            const newCart = await Cart.create(data);
            await newCart.save();
            res.status(200).json({msg:'Product added to the cart!'})
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateItemInCart = async (req: Request, res: Response) => {
    console.log('Desde updateItemInCart');
    console.log(req.body)
}

export const deleteItemInCart = async (req: Request, res: Response) => {
    console.log(req.body);
    const { cartID } = req.body
    const { id } = req.params;

    try {
        let cartUser = await Cart.findById(cartID);
        let product = await Product.findById(id);

        console.log(product)

        console.log(cartUser)
        
        if(cartUser) {
            const deleteProduct = cartUser.products.filter(data => data.product._id !== product?._id);
            console.log(deleteProduct)
            cartUser.products = deleteProduct;
            console.log(cartUser.products)
            // await cartUser.save();
            return res.status(200).json({msg: "Product deleted!"})
        }
    } catch (error) {
        console.log(error);
    }
}