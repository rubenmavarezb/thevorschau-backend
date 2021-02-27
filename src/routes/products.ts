import express from 'express';
////////////////////////////////////////////////////////////
import { getAllProducts, getProductById, getProductsByCategory } from '../controllers/productsController';
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




export default productsRoute;