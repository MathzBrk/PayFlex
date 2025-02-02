import {TransactionService} from "../services/TransactionService";
import {Transaction} from "@prisma/client";
import {CreateTransactionDto} from "../domain/transaction/dto/createTransactionDto";
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
            res.status(201).json(newTransaction);
        } catch (error: any){
            return res.status(400).json({ error: error.message });
        }
    }

}