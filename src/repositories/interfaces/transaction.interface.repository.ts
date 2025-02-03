import { Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../../domain/transaction/dto/create-transaction.dto";

export interface TransactionInterfaceRepository {
    createTransaction(transactionDto: CreateTransactionDto): Promise<Transaction>;
    getAllTransactions(): Promise<Transaction[]>;
    getTransactionsByTime(seconds: number): Promise<Transaction[]>;
}