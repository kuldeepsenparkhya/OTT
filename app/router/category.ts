import express, { Application } from 'express';
import { create, findAll, findOne } from '../controller/category';
const router = express.Router();

router.post('/categories', create);
router.get('/categories', findAll);
router.get('/categories/:id', findOne);





export default (app: Application): void => {
    app.use('/api', router);
};