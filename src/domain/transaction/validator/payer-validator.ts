
import {ITransactionValidator} from "./interface/itransaction.validator";
import {CreateTransactionDto} from "../dto/createTransactionDto";
import {PartiesInvolvedNotFound} from "../../../errors/PartiesInvolvedNotFound";
import {PayerIsAMerchantError} from "../../../errors/PayerIsAMerchantError";
import {InsufficientBalanceError} from "../../../errors/InsufficientBalanceError";
import {IUserRepository} from "../../../repositories/interfaces/IUserRepository";

export class PayerValidator implements ITransactionValidator {

    constructor(private userRepository: IUserRepository) {
    }

    async validate(transactionDto: CreateTransactionDto): Promise<void> {
        const payer = await this.userRepository.findById(transactionDto.payer);

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

    }



}