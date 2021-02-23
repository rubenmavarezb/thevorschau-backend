import User from '../models/User';
/////////////////////////////////////////////////////
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
/////////////////////////////////////////////////////
require('dotenv').config({ path: 'variables.env'});
////////////////////////////////////////////////////

export const authenticateUser = async (req, res, next) => {

    
    //check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    //Check if user is registrated
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    
    if(!user) {
        res.status(401).json({msg: "User doesn't exists"});
        return next();
    }

    //Check password and auth user

    if(bcrypt.compareSync(password, user.password)) {
        //Create JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRETWORD!, {
            expiresIn: '8h'
        })

        res.json({token})
    } else {
        res.status(401).json({msg: "Wrong password"})
        
    }

    return next();

}

export const userAuthenticated = async (req, res) => {
    res.json({user: req.user})
}