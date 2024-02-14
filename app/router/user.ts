import express, { Application } from 'express';
import { create, getAllUsers } from '../controller/user';
const router = express.Router();

router.post('/users', create);
router.get('/users', getAllUsers);



export default (app: Application ): void => {
    app.use('/api', router);
};