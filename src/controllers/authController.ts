import User from '../models/User';
import Helper from '../models/Helper'
/////////////////////////////////////////////////////
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
/////////////////////////////////////////////////////
require('dotenv').config({ path: 'variables.env'});
////////////////////////////////////////////////////

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    
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

export const userAuthenticated = async (req: any, res: Response) => {
    res.json({user: req.user})
}
export const authenticateHelper = async (req: Request, res: Response, next: NextFunction) => {

    
    //check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    //Check if user is registrated
    const { email, password } = req.body;
    const helper = await Helper.findOne({ email })
    
    if(!helper) {
        res.status(401).json({msg: "Helper doesn't exists"});
        return next();
    }

    //Check password and auth helper

    if(bcrypt.compareSync(password, helper.password)) {
        //Create JWT
        const token = jwt.sign({
            id: helper._id,
            name: helper.name,
            email: helper.email
        }, process.env.SECRETWORD!, {
            expiresIn: '8h'
        })

        res.json({token})
    } else {
        res.status(401).json({msg: "Wrong password"})
        
    }

    return next();

}

export const helperAuthenticated = async (req: any, res: Response) => {
    res.json({helper: req.user})
}