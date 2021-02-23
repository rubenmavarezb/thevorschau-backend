import express from 'express';
import { check } from 'express-validator';
////////////////////////////////////////////////////////////
import { createUser } from '../controllers/usersController';
////////////////////////////////////////////////////////////

const usersRoute = express.Router();

usersRoute.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Must be a valid email').isEmail(),
        check('password', "Password must have at least 6 characters").isLength({min: 6})
    ],
    createUser
);


export default usersRoute;