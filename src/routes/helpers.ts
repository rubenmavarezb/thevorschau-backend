import express from 'express';
import { check } from 'express-validator';
////////////////////////////////////////////////////////////
import { createHelper } from '../controllers/helpersController';
////////////////////////////////////////////////////////////

const helpersRoute = express.Router();

helpersRoute.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Must be a valid email').isEmail(),
        check('password', "Password must have at least 6 characters").isLength({min: 6})
    ],
    createHelper
);


export default helpersRoute;