import { Request, Response } from 'express';
import { Category } from '../model';


export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, slug, description, parantCategory, } = req.body

        const data = { name, slug, description, parantCategory, }

        const newCategory = new Category(data);

        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json(error);
    }
};



export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find();

        res.status(201).json(categories);
    } catch (error) {
        res.status(400).json(error);
    }
};


export const findOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const category = await Category.findOne({ _id: id });

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
};