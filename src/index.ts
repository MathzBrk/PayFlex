import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDatabase } from './database/databaseConnection';
import userRouter from './routes/userRoutes';
import transactionRoutes from "./routes/transactionRoutes";
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
    res.send('Servidor funcionando na porta 8082!');
  });

  app.listen(port, () => {
    console.log(`🚀 Servidor escutando na porta ${port}`);
  });

  
}

startServer();
