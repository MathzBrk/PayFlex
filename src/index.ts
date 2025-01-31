import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb, { connectToDatabase } from './database/databaseConnection';
import userRouter from './routes/userRoutes';

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
  app.use('/api', userRouter);

  app.get('/', (req, res) => {
    res.send('Servidor funcionando na porta 8082!');
  });

  app.listen(port, () => {
    console.log(`🚀 Servidor escutando na porta ${port}`);
  });

  
}

startServer().catch(console.error);
