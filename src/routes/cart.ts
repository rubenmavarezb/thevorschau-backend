import express from 'express';
////////////////////////////////////////////////////////////
import auth from '../middleware/auth';
import { addToCart, getCart, deleteItemInCart, deleteCart } from '../controllers/cartController';
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
    deleteItemInCart
);

cartRoute.delete('/:id', 
    deleteCart
);



export default cartRoute;