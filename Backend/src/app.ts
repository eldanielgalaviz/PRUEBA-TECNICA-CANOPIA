import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use(errorHandler);

export default app;
