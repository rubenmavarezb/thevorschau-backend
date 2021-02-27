import User from '../models/User';
//////////////////////////////////////////////////////
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
//////////////////////////////////////////////////////

export const createUser = async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Verify if user exists
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ msg: 'Email already exists'});
    }

    //Creating new user
    user = new User(req.body);

    //Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
        await user.save();
        res.json({msg: 'User created'});
    } catch (error) {
        console.log(error)
    }
}