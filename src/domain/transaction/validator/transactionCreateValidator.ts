import { InsufficientBalanceError } from "../../../errors/InsufficientBalanceError";
import { PartiesInvolvedNotFound } from "../../../errors/PartiesInvolvedNotFound";
import { PayerIsAMerchantError } from "../../../errors/PayerIsAMerchantError";
import { UserRepository } from "../../../repositories/UserRepository";
import { CreateTransactionDto } from "../dto/createTransactionDto";

export class TransactionCreateValidator {
    
    constructor(private userRepository: UserRepository) {}

    validate = async(transactionDto: CreateTransactionDto) => {
        
        const payer = await this.userRepository.findById(transactionDto.payer);
        const payee = await this.userRepository.findById(transactionDto.payee);

        if(payer === null){
            throw new PartiesInvolvedNotFound(`Payer with id '${transactionDto.payer}' not found`);
        } else{
            if(payer.isMerchant){
                throw new PayerIsAMerchantError("Merchants can't send money");
            }

            if(payer.balance < transactionDto.value){
                throw new InsufficientBalanceError("Payer doesn't have sufficient balance for this transaction");
            }
        }

        if(payee === null){
            throw new PartiesInvolvedNotFound(`Payee with id '${transactionDto.payee}' not found`);
        }
    }

}