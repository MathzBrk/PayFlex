import { Router } from "express";
import {TransactionController} from "../controllers/TransactionController";
import {StatsController} from "../controllers/stats-controller";

const router = Router();
const transactionController = new TransactionController();
const statsController = new StatsController();


/**
 * @swagger
 * /transactions/transfer:
 *   post:
 *     summary: Realiza uma transferência entre usuários
 *     tags:
 *      - Transaction
 *     description: Endpoint para a realização de uma transferência de um valor entre um pagador (payer) e um recebedor (payee).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *               - payee
 *               - payer
 *             properties:
 *               value:
 *                 type: number
 *                 description: Valor a ser transferido.
 *                 example: 23
 *               payee:
 *                 type: string
 *                 description: ID do usuário recebedor.
 *                 example: "0a05d403-cfe4-4593-b93f-f352f6cc0a24"
 *               payer:
 *                 type: string
 *                 description: ID do usuário pagador.
 *                 example: "f1183c75-7dac-45fb-a039-635dec701a44"
 *     responses:
 *       200:
 *         description: Transferência realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transfer completed successfully."
 *       400:
 *         description: Requisição inválida ou dados faltantes.
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/transactions/transfer', transactionController.executeTransaction.bind(transactionController));

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Recupera todas as transações
 *     tags:
 *      - Transaction
 *     description: Endpoint para obter todas as transações registradas no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de transações retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: 22
 *                   value:
 *                     type: number
 *                     example: 23.0
 *                   payer:
 *                     type: string
 *                     example: "f1183c75-7dac-45fb-a039-635dec701a44"
 *                   payee:
 *                     type: string
 *                     example: "0a05d403-cfe4-4593-b93f-f352f6cc0a24"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-01T20:10:00.000Z"
 *       500:
 *         description: Erro interno ao recuperar transações.
 */
router.get('/transactions', transactionController.getAllTransactions.bind(transactionController));

/**
 * @swagger
 * /transactions/time:
 *   get:
 *     summary: Obtém transações por período de tempo
 *     tags:
 *      - Transaction
 *     description: Retorna todas as transações que ocorreram em um determinado período de tempo.
 *                  Você pode passar um parâmetro de query `seconds` para definir o período (em segundos).
 *                  Se nenhum parâmetro for informado, o valor padrão é 60 segundos.
 *     parameters:
 *       - in: query
 *         name: seconds
 *         schema:
 *           type: integer
 *           default: 60
 *         description: Número de segundos para filtrar as transações
 *     responses:
 *       200:
 *         description: Lista de transações ocorridas no período especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: 22
 *                   value:
 *                     type: number
 *                     example: 23.0
 *                   payer:
 *                     type: string
 *                     example: "f1183c75-7dac-45fb-a039-635dec701a44"
 *                   payee:
 *                     type: string
 *                     example: "0a05d403-cfe4-4593-b93f-f352f6cc0a24"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-01T20:10:00.000Z"
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/transactions/time', transactionController.getTransactionsByTime.bind(transactionController));

/**
 * @swagger
 * /transactions/stats/time:
 *   get:
 *     summary: Retorna estatísticas das transações em um intervalo de tempo
 *     tags:
 *      - Stats
 *     description: Esse endpoint retorna as estatísticas (count, sum, min, max, avg) das transações que ocorreram em um determinado intervalo de tempo.
 *                  O intervalo (em segundos) pode ser informado via parâmetro de query `seconds`. Se não for informado, o valor padrão é 60 segundos.
 *     parameters:
 *       - in: query
 *         name: seconds
 *         schema:
 *           type: integer
 *           default: 60
 *         description: Intervalo de busca em segundos.
 *     responses:
 *       200:
 *         description: Estatísticas calculadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 100
 *                 sum:
 *                   type: number
 *                   example: 25640.13
 *                 min:
 *                   type: number
 *                   example: 2.65
 *                 max:
 *                   type: number
 *                   example: 483.91
 *                 avg:
 *                   type: number
 *                   example: 256.40
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/transactions/stats/time', statsController.getTransactionsStats.bind(statsController));


export default router;