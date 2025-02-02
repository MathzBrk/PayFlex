import {ITransactionValidator} from "./interface/itransaction.validator";
import {CreateTransactionDto} from "../dto/createTransactionDto";
import {IUserRepository} from "../../../repositories/interfaces/IUserRepository";
import {PartiesInvolvedNotFound} from "../../../errors/PartiesInvolvedNotFound";

export class PayeeValidator implements ITransactionValidator{

    constructor(private userRepository: IUserRepository){}

    async validate(transactionDto: CreateTransactionDto): Promise<void> {
        const payee = await this.userRepository.findById(transactionDto.payee);


        if(payee === null){
            throw new PartiesInvolvedNotFound(`Payee with id '${transactionDto.payee}' not found`);
        }
    }

}