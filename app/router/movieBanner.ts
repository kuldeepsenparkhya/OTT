import express, { Application } from 'express';
const router = express.Router();


import { multipleFileUploading } from '../middleware/middleware';
import { create, findAll, findOne } from '../controller/movieBanner';

router.post('/movieBanners', multipleFileUploading, create);

router.get('/movieBanners', findAll);
router.get('/movieBanners/:id', findOne);



export default (app: Application): void => {
    app.use('/api', router);
};