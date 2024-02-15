import { Request, Response } from 'express';
import { Genre } from '../model';


export const create = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, } = req.body
        const data = { name, }

        const newGenre = new Genre(data);

        await newGenre.save();

        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const genres = await Genre.find();

        res.status(201).json(genres);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const genre = await Genre.findOne({ _id: id });

        res.status(201).json(genre);
    } catch (error) {
        res.status(400).json(error);
    }
};