import express, { Application } from 'express';
const router = express.Router();

import { forgotPassword, login, me } from '../controller';










router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.get('/me', me);




export default (app: Application): void => {
    app.use('/api', router);
};