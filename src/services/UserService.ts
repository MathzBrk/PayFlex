import {DocType, User} from '@prisma/client';
import { CreateUserDto } from '../domain/user/dto/createUserDto';
import { UserValidator } from '../domain/user/validator/userCreateValidador';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { CPF, CNPJ } from '@julioakira/cpf-cnpj-utils'
import {DocumentInvalidError} from "../errors/DocumentInvalidError";
import {DocumentIsRequired} from "../errors/DocumentIsRequired";


export class UserService {

    private userRepository: IUserRepository;
    private validator: UserValidator;

    constructor(){
        this.userRepository = new UserRepository();
        this.validator = new UserValidator(this.userRepository);
    }

    private determineDocument = (document: string, isMerchant: boolean): "CPF" | "CNPJ" => {
        console.log("Validating document: ", document);

        if (!document) {
            throw new DocumentIsRequired("CNPJ/CPF is required to create a user");
        }

        if (!isMerchant) {
            if (CPF.Validate(document)) {
                console.log("CPF validated successfully for normal user.");
                return "CPF";
            }
            if (CNPJ.Validate(document)) {
                throw new DocumentIsRequired("Normal users cannot have a CNPJ document.");
            }
            throw new DocumentIsRequired("Provided document is not a valid CPF.");
        }

        if (isMerchant) {
            if (CNPJ.Validate(document)) {
                console.log("CNPJ validated successfully for merchant.");
                return "CNPJ";
            }
            if (CPF.Validate(document)) {
                throw new DocumentIsRequired("Merchants cannot have a CPF document.");
            }
            throw new DocumentIsRequired("Provided document is not a valid CNPJ.");
        }

        throw new DocumentIsRequired("Unable to determine document type.");

    }

    private formatDocument = (document: string, docType: DocType): string => {
        console.log("Formatting document: ", document, docType);
        if(docType === "CNPJ"){
            return CNPJ.Strip(document);
        }

        return CPF.Strip(document);

    }
    
    async createUser(userDto: CreateUserDto): Promise<User | null>{
        try{
            const documentType = this.determineDocument(userDto.document, userDto.isMerchant);
            const formattedDocument = this.formatDocument(userDto.document, documentType);

            console.log('Validating userDto...', userDto);

            await this.validator.validate(userDto, formattedDocument);

            return this.userRepository.create(userDto, formattedDocument ,documentType);

        } catch(error){
            console.log("Error during creating user ", error );
            throw error;
        }
    }



}
