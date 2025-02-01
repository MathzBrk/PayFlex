import { PrismaClient, Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../domain/transaction/dto/createTransactionDto";
import { ITransactionRepository } from "./interfaces/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository{
    
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    create = async (transactionDto: CreateTransactionDto): Promise<Transaction> =>{
        return this.prisma.transaction.create({
            data : {
                value: transactionDto.value,
                payer: {
                    connect: {id: transactionDto.payer}
                },
                payee: {
                    connect: {id: transactionDto.payee}
                }
            }
        });
       };

}