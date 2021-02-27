import express from 'express';
////////////////////////////////////////////////////////////
import { addToCart, getCart, updateItemInCart, deleteItemInCart } from '../controllers/cartController';
////////////////////////////////////////////////////////////

const cartRoute = express.Router();

cartRoute.post('/',
    addToCart
);

cartRoute.get('/',
    getCart
);

cartRoute.put('/:id',
    updateItemInCart
);

cartRoute.delete('/:id',
    deleteItemInCart
);



export default cartRoute;