import { Request, Response } from 'express';
///////////////////////////////////////////////////////
import Product from '../models/Product';
import Favorites from '../models/Favorites';
//////////////////////////////////////////////////////

export const getFavorites = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        const userFavorites = await Favorites.findOne({ owner:id });
        
        if(!userFavorites) {
           return res.status(400).json({msg: 'You need to login o create an account in order to see your favorites!'});
        }

        res.status(200).json({cart: userFavorites.products, id:userFavorites._id});
    } catch (error) {
        console.log(error);
    }

}

export const addToFavorites = async (req: Request, res: Response) => {

    const { id, prodID } = req.body;
    let userFavorites = await Favorites.findOne({ owner:id });
    let product = await Product.findById(prodID);

    try {

        //Create the favorites if the user doesn't have one and return
        if(!userFavorites) {

            const data = {
                owner: id,
                products: [product]
            }
    
            const newFavorites = await Favorites.create(data);
            await newFavorites.save();
            return res.status(200).json({msg:'Product added to favorites!'})
        }

        if(product) userFavorites.products.push(product);
        await Favorites.findOneAndUpdate({owner: id}, userFavorites, {new:true});
        res.status(200).json({msg:'Product added!'})


    } catch (error) {
        console.log(error)
    }
}

export const deleteItemInFavorites = async (req: Request, res: Response) => {

    const { favoritesID } = req.body;
    const { id } = req.params;

    let userFavorites = await Favorites.findById(favoritesID);

    try {
        
        if(!userFavorites) {
            return res.status(404).json({msg: "There was an error!"})
        }

        const isInFavorites = userFavorites.products.find((element) => String(element._id) === id);

        if(!isInFavorites) {
            return res.status(404).json({msg: "There was an error or the product may be already deleted"});
        }

        userFavorites.products = userFavorites.products.filter(product => String(product._id) !== id);

        await Favorites.findOneAndUpdate({_id: favoritesID}, userFavorites, {new:true});

        res.status(200).json({msg: "Product deleted from favorites!"})

    } catch (error) {
        console.log(error);
    }
}

export const deleteFavorites = async (req: Request, res: Response) => {

    const { id } = req.params;
    let userFavorites = await Favorites.findById(id);

    try {
        
        if(!userFavorites) {
            return res.status(404).json({msg: "There was an error!"})
        }

        await Favorites.findByIdAndRemove(id)

        res.status(200).json({msg: "Favorites deleted!"})

    } catch (error) {
        console.log(error);
    }
}