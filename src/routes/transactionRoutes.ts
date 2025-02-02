import { Router } from "express";
import {TransactionController} from "../controllers/TransactionController";
import {StatsController} from "../controllers/stats-controller";

const router = Router();
const transactionController = new TransactionController();
const statsController = new StatsController();

router.post('/transfer', transactionController.executeTransaction.bind(transactionController));
router.get('/', transactionController.getAllTransactions.bind(transactionController));
router.get('/time', transactionController.getTransactionsByTime.bind(transactionController));
router.get('/stats/time', statsController.getTransactionsStats.bind(statsController));

export default router;