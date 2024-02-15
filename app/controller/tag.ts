import { Request, Response } from 'express';
import { Tag } from '../model';


export const create = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, } = req.body
        const data = { name, }

        const newGenre = new Tag(data);

        await newGenre.save();

        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const tags = await Tag.find();

        res.status(201).json(tags);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const tag = await Tag.findOne({ _id: id });

        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json(error);
    }
};