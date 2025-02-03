import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *      - User
 *     description: Cadastro de um novo usuário. Envia os dados do usuário para cadastro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - document
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Nome completo do usuário.
 *                 example: Luis Felipe
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *                 example: "luisss@email.com"
 *               isMerchant:
 *                 type: boolean
 *                 description: Indica se o usuário é lojista (opcional, default é false).
 *                 default: false
 *                 example: false
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *                 example: "123456"
 *               document:
 *                 type: string
 *                 description: CPF do usuário (para usuários normais) ou CNPJ (para lojistas).
 *                 example: "914.426.990-00"
 *               balance:
 *                 type: number
 *                 description: Saldo inicial da carteira (opcional, default é 0).
 *                 default: 0
 *                 example: 10000
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "0a05d403-cfe4-4593-b93f-f352f6cc0a24"
 *                 fullName:
 *                   type: string
 *                   example: "Luis Felipe"
 *                 email:
 *                   type: string
 *                   example: "luisss@email.com"
 *                 isMerchant:
 *                   type: boolean
 *                   example: false
 *                 document:
 *                   type: string
 *                   example: "91442699000"
 *                 documentType:
 *                   type: string
 *                   example: "CPF"
 *
 *       400:
 *         description: Dados inválidos enviados para cadastro.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/users', userController.createUser.bind(userController));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - User
 *     description: Retorna uma lista com todos os usuários registrados no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "0a05d403-cfe4-4593-b93f-f352f6cc0a24"
 *                   fullName:
 *                     type: string
 *                     example: "Luis Felipe"
 *                   email:
 *                     type: string
 *                     example: "luis@email.com"
 *                   isMerchant:
 *                     type: boolean
 *                     example: true
 *                   document:
 *                     type: string
 *                     example: "01864908000106"
 *                   documentType:
 *                     type: string
 *                     example: "CNPJ"
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/users', userController.findAll.bind(userController));

export default router;
