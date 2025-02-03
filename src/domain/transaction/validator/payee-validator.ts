import {ITransactionValidator} from "./interface/itransaction.validator";
import {CreateTransactionDto} from "../dto/createTransactionDto";
import {UserInterfaceRepository} from "../../../repositories/interfaces/user.interface.repository";
import {PartiesInvolvedNotFoundError} from "../../../errors/parties-involved-not-found.error";

export class PayeeValidator implements ITransactionValidator{

    constructor(private userRepository: UserInterfaceRepository){}

    async validate(transactionDto: CreateTransactionDto): Promise<void> {
        const payee = await this.userRepository.findById(transactionDto.payee);


        if(payee === null){
            throw new PartiesInvolvedNotFoundError(`Payee with id '${transactionDto.payee}' not found`);
        }
    }

}