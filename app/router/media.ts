import express, { Application, Request, Response } from 'express';
import path from 'path';

const router = express.Router();

router.get('/media/:name', (req: Request, res: Response) => {
    const { type, name } = req.params

    res.sendFile(path.join(__dirname, `../upload/${name}`,))
});


export default (app: Application): void => {
    app.use('/api', router);
};