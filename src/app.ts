import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import membershipRoutes from './modules/membership/membership.routes';
import informationRoutes from './modules/information/information.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// app routes
app.use('/', membershipRoutes);
app.use('/', informationRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ status: 404, message: 'Route not found', data: null });
});

// global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, message: 'Internal server error', data: null });
});

export default app;
