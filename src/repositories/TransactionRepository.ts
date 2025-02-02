import { PrismaClient, Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../domain/transaction/dto/createTransactionDto";
import { ITransactionRepository } from "./interfaces/ITransactionRepository";
import prisma from "../database/prismaClient";

export class TransactionRepository implements ITransactionRepository{
    private prisma: PrismaClient = prisma;

    createTransaction = async (createTransactionDto: CreateTransactionDto): Promise<Transaction> => {
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

         })
    }


}