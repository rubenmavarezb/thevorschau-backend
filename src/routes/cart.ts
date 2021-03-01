import express from 'express';
////////////////////////////////////////////////////////////
import auth from '../middleware/auth';
import { addToCart, getCart, updateItemInCart, deleteItemInCart } from '../controllers/cartController';
////////////////////////////////////////////////////////////

const cartRoute = express.Router();

cartRoute.post('/',
    addToCart
);

cartRoute.get('/',
    auth,
    getCart
);

cartRoute.put('/:id',
    updateItemInCart
);

cartRoute.delete('/:id',
    deleteItemInCart
);



export default cartRoute;