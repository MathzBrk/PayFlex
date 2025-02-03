import {TransactionService} from "../services/transaction.service";
import {Transaction} from "@prisma/client";
import {CreateTransactionDto} from "../domain/transaction/dto/create-transaction.dto";
import {Request, Response} from 'express';


export class TransactionController {

    private service: TransactionService;

    constructor() {
        this.service = new TransactionService();
    }

    public async executeTransaction(req: Request, res: Response){
        console.log("Request received:", req.body);
        try{
            const transactionDto: CreateTransactionDto = req.body;
            const newTransaction = await this.service.executeTransaction(transactionDto);
            console.log("New transaction created:", newTransaction);
            res.status(201).json("Transfer completed successfully.");
        } catch (error: any){
            return res.status(400).json({ error: error.message });
        }
    }

    public async getAllTransactions(req: Request, res: Response){
        console.log("Request received to get all transactions");
        try{
            const transactions = await this.service.getAllTransactions();
            res.status(200).json(transactions);
        } catch (error: any){
            return res.status(500).json({ error: error.message });
        }
    }

    public async getTransactionsByTime(req: Request, res: Response){
        console.log("Request received to get all transactions by time");
        try {
            const seconds = req.query.seconds ? parseInt(req.query.seconds as string, 10) : 60;
            const transactions = await this.service.getTransactionsBytime(seconds);
            res.status(200).json(transactions);
        } catch (error: any){
            return res.status(500).json({ error: error.message });
        }
    }

}