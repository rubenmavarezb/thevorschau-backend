import { Request, Response } from 'express';
///////////////////////////////////////////////////////
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

        //Create the cart if the user doesn't have one and return
        if(!userCart) {

            const data = {
                owner: id,
                products: [product]
            }
    
            const newCart = await Cart.create(data);
            await newCart.save();
            return res.status(200).json({msg:'Product added to the cart!'})
        }

        //Find the product in the cart to update it and return
        const isInCart = userCart.products.find((element) => String(element._id) === prodID);

        if(isInCart) {
            const prodIndex = product ? userCart.products.indexOf(isInCart) : -1;

            userCart.products[prodIndex].quantity += quantity;

            await Cart.findOneAndUpdate({owner: id}, userCart, {new:true});

            return res.status(200).json({msg:'Product modified!'})
        }

        userCart.products.push(product);
        await Cart.findOneAndUpdate({owner: id}, userCart, {new:true});
        res.status(200).json({msg:'Product added!'})


    } catch (error) {
        console.log(error)
    }
}

export const deleteItemInCart = async (req: Request, res: Response) => {

    const { cartID } = req.body;
    const { id } = req.params;

    let cartUser = await Cart.findById(cartID);

    try {
        
        if(!cartUser) {
            return res.status(404).json({msg: "There was an error!"})
        }

        const isInCart = cartUser.products.find((element) => String(element._id) === id);

        if(!isInCart) {
            return res.status(404).json({msg: "There was an error or the product may be already deleted"});
        }

        cartUser.products = cartUser.products.filter(product => String(product._id) !== id);

        await Cart.findOneAndUpdate({_id: cartID}, cartUser, {new:true});

        res.status(200).json({msg: "Product deleted!"})

    } catch (error) {
        console.log(error);
    }
}

export const deleteCart = async (req: Request, res: Response) => {

    const { id } = req.params;
    let userCart = await Cart.findById(id);

    try {
        
        if(!userCart) {
            return res.status(404).json({msg: "There was an error!"})
        }

        await Cart.findByIdAndRemove(id)

        res.status(200).json({msg: "Cart empty!"})

    } catch (error) {
        console.log(error);
    }
}