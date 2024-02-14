import { Request, Response } from 'express';
import { User } from '../model';


export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, } = req.body;

        const data = { name, email, password, };

        const newUser = new User(data);

        await newUser.save();

        res.status(201).json(newUser);

    } catch (error: any) {
        res.status(400).json(error.message);
    }
}


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {


        const users = await User.find();


        res.status(201).json(users);

    } catch (error: any) {
        res.status(400).json(error.message);
    }
}
