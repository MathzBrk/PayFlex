
import {TransactionInterfaceValidator} from "./interface/transaction.interface.validator";
import {CreateTransactionDto} from "../dtos/create-transaction.dto";
import {PartiesInvolvedNotFoundError} from "../../../errors/parties-involved-not-found.error";
import {PayerIsAMerchantError} from "../../../errors/payer-is-a-merchant.error";
import {InsufficienttBalanceError} from "../../../errors/insufficientt-balance.error";
import {UserInterfaceRepository} from "../../users/repository/interfaces/user.interface.repository";

export class PayerValidator implements TransactionInterfaceValidator {

    constructor(private userRepository: UserInterfaceRepository) {
    }

    async validate(transactionDto: CreateTransactionDto): Promise<void> {
        const payer = await this.userRepository.findById(transactionDto.payer);

        if(payer === null){
            throw new PartiesInvolvedNotFoundError(`Payer with id '${transactionDto.payer}' not found`);
        } else{

            if(payer.isMerchant){
                throw new PayerIsAMerchantError("Merchants can't send money");
            }

            if(payer.balance < transactionDto.value){
                throw new InsufficienttBalanceError("Payer doesn't have sufficient balance for this transaction");
            }
        }

    }



}