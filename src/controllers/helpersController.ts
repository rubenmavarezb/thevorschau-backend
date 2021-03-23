import Helper from '../models/Helper';
//////////////////////////////////////////////////////
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
//////////////////////////////////////////////////////

export const createHelper = async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Verify if user exists
    const { email, password } = req.body;

    let helper = await Helper.findOne({ email });

    if (helper) {
        return res.status(400).json({ msg: 'Email already exists'});
    }

    //Creating new helper
    helper = new Helper(req.body);

    //Hash password
    const salt = await bcrypt.genSalt(10);
    helper.password = await bcrypt.hash(password, salt);

    try {
        await helper.save();
        res.json({msg: 'Helper created'});
    } catch (error) {
        console.log(error)
    }
}