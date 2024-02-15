import express, { Application } from 'express';
import { create, findAll, findOne } from '../controller/movie';
import { fileUploader } from '../middleware/middleware';
const router = express.Router();

router.post('/movies', fileUploader, create);
router.get('/movies', findAll);
router.get('/movies/:id', findOne);





export default (app: Application): void => {
    app.use('/api', router);
};