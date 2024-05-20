import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import authController from './auth/auth.controller';
import { HttpException } from './common/http-exception';
import { corsOptions } from './config/cors-options';
import { exceptionHandler } from './middlewares/exception-handler';
import productsController from './products/products.controller';
import usersController from './users/users.controller';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello',
  });
});

app.use('/products', productsController);
app.use('/auth', authController);
app.use('/users', usersController);

app.all('*', (req, res) => {
  throw new HttpException('Not Found', 404);
});

app.use(exceptionHandler);

app.listen(8000, () => {
  console.log('App is running at port: 8000');
});
