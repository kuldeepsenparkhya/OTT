import express, { Application } from 'express';
import { create, findAll, findOne } from '../controller/genre';
const router = express.Router();

router.post('/genres', create);
router.get('/genres', findAll);
router.get('/genres/:id', findOne);





export default (app: Application): void => {
    app.use('/api', router);
};