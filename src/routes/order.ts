import express from 'express';
////////////////////////////////////////////////////////////
import { createOrder, getOrderByID, getAllOrders } from '../controllers/orderController';
////////////////////////////////////////////////////////////

const orderRoute = express.Router();

orderRoute.post('/',
    createOrder
);

orderRoute.get('/:id',
    getOrderByID
);

orderRoute.get('/',
    getAllOrders
)


export default orderRoute;