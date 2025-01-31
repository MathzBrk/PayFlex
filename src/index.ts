import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import prisma, { connectToDatabase } from './database/databaseConnection';

const addMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

async function startServer() {
  const app: Application = express();
  const port = 8082;
  
  await connectToDatabase();


  addMiddlewares(app);

  app.get('/', (req, res) => {
    res.send('Servidor funcionando na porta 8082!');
  });

  app.listen(port, () => {
    console.log(`🚀 Servidor escutando na porta ${port}`);
  });
}

// Chama a função e captura possíveis erros
startServer().catch(console.error);
