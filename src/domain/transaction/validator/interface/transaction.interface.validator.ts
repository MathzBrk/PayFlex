import {CreateTransactionDto} from "../../dto/create-transaction.dto";

export interface TransactionInterfaceValidator {
    validate(transactionDto: CreateTransactionDto): Promise<void>;
}