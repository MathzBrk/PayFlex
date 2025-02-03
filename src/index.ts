import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDatabase } from './database/database-connection';
import userRouter from './routes/user.routes';
import transactionRoutes from "./routes/transaction.routes";
import * as dotenv from 'dotenv';
import setupSwagger from "./config/swagger";

dotenv.config();

const addMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

async function startServer() {
  const app: Application = express();
  const port = 8082;
  
  await connectToDatabase();

  addMiddlewares(app);
  setupSwagger(app);

  app.use('/', userRouter);
  app.use('/', transactionRoutes)

  app.get('/', (req, res) => {
    res.send(`Server running on port ${port}`);
  });

  app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
    console.log(`📖 Swagger docs available at http://localhost:${port}/api/v1/docs/`);
  });

}

startServer();
