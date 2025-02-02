import {TransactionRepository} from "../repositories/TransactionRepository";
import {TransactionStats} from "../domain/transaction/dto/transaction-stats.dto";
import {Transaction} from "@prisma/client";
import * as stats from 'stats-lite';

export class StatsService {

    private transactionRepository: TransactionRepository;

    constructor() {
        this.transactionRepository = new TransactionRepository();
    }

    public calculateTransactionsStatistics = async(seconds: number): Promise<TransactionStats> => {
        try {
            console.log("Trying to calculate transactions stats...");

            const transactions: Transaction[] = await this.transactionRepository.getTransactionsByTime(seconds);

            if (!transactions || transactions.length === 0) {
                console.log("No transactions found in the given time frame.");
                return new TransactionStats(0, 0, 0, 0, 0);
            }

            const amounts: number[] = transactions.map(t => t.value);

            const count = amounts.length;
            const sum = stats.sum(amounts);
            const avg = stats.mean(amounts);
            const min = Math.min(...amounts);
            const max = Math.max(...amounts);

            const transactionStats = new TransactionStats(count, sum, min, max, avg);

            console.log("Transaction statistics calculated successfully", transactionStats);

            return transactionStats;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}