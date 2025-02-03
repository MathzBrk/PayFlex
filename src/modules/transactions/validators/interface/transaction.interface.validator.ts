import {CreateTransactionDto} from "../../dtos/create-transaction.dto";

export interface TransactionInterfaceValidator {
    validate(transactionDto: CreateTransactionDto): Promise<void>;
}