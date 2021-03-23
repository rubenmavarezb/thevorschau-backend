import express from 'express';
import {authenticateUser, userAuthenticated, authenticateHelper, helperAuthenticated} from '../controllers/authController';
import auth from '../middleware/auth';
import { check } from 'express-validator';

const authRoute = express.Router();

authRoute.post('/',
    [
        check('email', 'Add a correct email').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    authenticateUser
);

authRoute.get('/',
    auth,
    userAuthenticated
);

authRoute.post('/helper',
    [
        check('email', 'Add a correct email').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    authenticateHelper
);

authRoute.get('/helper',
    auth,
    helperAuthenticated
);

export default authRoute;