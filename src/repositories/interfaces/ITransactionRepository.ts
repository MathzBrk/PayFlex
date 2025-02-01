import { Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../../domain/transaction/dto/createTransactionDto";

export interface ITransactionRepository{
    create(transactionDto: CreateTransactionDto): Promise<Transaction>;
}