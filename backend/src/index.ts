import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { db } from '@/config/db';
import { swaggerDocs } from '@/config/swaggerDocs';
import farmRoutes from '@/routes/farmRoutes';

const app = express();
app.use(express.json());
// Use the CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  }),
);
app.use('/api', farmRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3002;

(async () => {
  try {
    await db.initialize();
    await db.runMigrations();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Error during application startup:', error);
  }
})();
