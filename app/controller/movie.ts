import { Request, Response } from 'express';
import { Movie } from '../model';

interface FileInterface {
    size: number;
    filename: string;
    mimetype: string;
    originalname: string;
    videoUrl: string;
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {

        const videoUrl = `/media/${req.file?.filename}`

        const { title, description, genres, categories, tags, languageType, releaseDate } = req.body

        const video: FileInterface = {
            size: req.file?.size ?? 0,
            filename: req.file?.filename ?? '',
            mimetype: req.file?.mimetype ?? '',
            originalname: req.file?.originalname ?? '',
            videoUrl: videoUrl ?? videoUrl
        };


        const data = { title, description, genres, categories, tags, languageType, releaseDate, video }

        const newMovie = new Movie(data);

        await newMovie.save();

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await Movie.find();
        console.log(req);

        res.status(201).json(movies);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const movie = await Movie.findOne({ _id: id });

        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json(error);
    }
};