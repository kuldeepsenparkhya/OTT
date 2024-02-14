import express, { Request, Response } from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';


import user from './app/router/user';
import auth from './app/router/auth';
import { authorization } from './app/middleware/middleware';

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.use(authorization)

// Routes
user(app);
auth(app)



app.get('*', (req: Request, res: Response) => {
  res.send('WelCome to OTT express app using typescript and ES6 Module!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
