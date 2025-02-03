import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Application, Express} from 'express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'PayFlex',
            version: '1.0.0',
            description: 'O PayFlex Solutions é uma plataforma de pagamentos simplificada. Nela é possível depositar e realizar transferências de dinheiro entre usuários. Temos 2 tipos de \n' +
                'usuários, os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles. ',
        },
        servers: [
            {
                url: 'http://localhost:8082/',
            },
        ],
    },
    apis: ['./src/modules/transactions/infra/routes/**/*.ts', './src/modules/users/infra/routes/**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: Application) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
