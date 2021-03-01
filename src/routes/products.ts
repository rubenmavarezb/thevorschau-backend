import express from 'express';
////////////////////////////////////////////////////////////
import { getAllProducts, getProductById, getProductsByCategory, addProduct } from '../controllers/productsController';
////////////////////////////////////////////////////////////

const productsRoute = express.Router();

productsRoute.get('/',
    getAllProducts
);

productsRoute.get('/category/:category',
    getProductsByCategory
);

productsRoute.get('/product/:id',
    getProductById
);

productsRoute.post('/',
    addProduct
)




export default productsRoute;