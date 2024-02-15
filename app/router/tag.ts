import express, { Application } from 'express';
import { create, findAll, findOne } from '../controller/tag';
const router = express.Router();

router.post('/tags', create);
router.get('/tags', findAll);
router.get('/tags/:id', findOne);





export default (app: Application): void => {
    app.use('/api', router);
};