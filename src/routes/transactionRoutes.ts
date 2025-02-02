import { Router } from "express";
import {TransactionController} from "../controllers/TransactionController";

const router = Router();
const transactionController = new TransactionController();

router.post('/transfer', transactionController.executeTransaction.bind(transactionController));

export default router;