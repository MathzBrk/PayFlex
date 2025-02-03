import { PrismaClient, Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../dtos/create-transaction.dto";
import { TransactionInterfaceRepository } from "./interfaces/transaction.interface.repository";
import prisma from "../../../database/prisma-client";

export class TransactionRepository implements TransactionInterfaceRepository{
    private prisma: PrismaClient = prisma;

    public createTransaction = async (createTransactionDto: CreateTransactionDto): Promise<Transaction> => {
         return this.prisma.$transaction(async (trx) => {

             await trx.user.update({
                 where: {id: createTransactionDto.payer},
                 data: {balance: {decrement: createTransactionDto.value}},
             });

             await trx.user.update({
                 where: {id: createTransactionDto.payee},
                 data: {balance: {increment: createTransactionDto.value}},
             });

             return trx.transaction.create({
                 data : {
                     value: createTransactionDto.value,
                     payer: {
                         connect: {id: createTransactionDto.payer}
                     },
                     payee: {
                         connect: {id: createTransactionDto.payee}
                     }
                 }
             });
         });
    }

    public getAllTransactions = async (): Promise<Transaction[]> => {
        return this.prisma.transaction.findMany();
    }

    public getTransactionsByTime = async(seconds: number): Promise<Transaction[]> => {
        const timeLimit = new Date();
        timeLimit.setSeconds(timeLimit.getSeconds() - seconds);

        return this.prisma.transaction.findMany({
            where: {
                createdAt: {gte: timeLimit},
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }


}