import { Request, Response } from 'express';
import { MovieBanner } from '../model';

interface FileInterface {
    size: number;
    filename: string;
    mimetype: string;
    originalname: string;
    bannerUrl: string;
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, languageType, movies, releaseDate } = req.body

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files && files.bannerImage) {

            const newImage: FileInterface[] = files?.bannerImage?.map((file) => ({
                size: file?.size,
                filename: file?.filename,
                mimetype: file?.mimetype,
                originalname: file?.originalname,
                bannerUrl: `/media/${file?.filename}`
            }))


            console.log('newImage>>>>>>>>>>>>>>>', newImage);
            const data = { title, description, languageType, releaseDate, banner: newImage, movies }

            const newMovie = new MovieBanner(data);

            await newMovie.save();

            res.status(201).json(newMovie);
        }



    } catch (error) {
        res.status(400).json(error);
    }
};


export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieBanners = await MovieBanner.find();

        res.status(201).json(movieBanners);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const movieBanner = await MovieBanner.findOne({ _id: id });

        res.status(201).json(movieBanner);
    } catch (error) {
        res.status(400).json(error);
    }
};