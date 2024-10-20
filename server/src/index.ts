import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import memberRoutes from './routes/member.route';

dotenv.config();

const mongo_uri = process.env.MONGO_URI || '';
const port = process.env.PORT || 3000;

const app = express();

mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => console.log('DB error', err));

app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:5173', 'https://family-tree-rho-seven.vercel.app'] }));

app.use('/api/member', memberRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ statusCode, message });
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
