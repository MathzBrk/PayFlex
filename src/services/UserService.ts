import {DocType, User} from '@prisma/client';
import {CreateUserDto} from '../domain/user/dto/CreateUserDto';
import {UserValidator} from '../domain/user/validator/UserCreateValidador';
import {IUserRepository} from '../repositories/interfaces/IUserRepository';
import {UserRepository} from '../repositories/UserRepository';
import {cnpj, cpf} from "cpf-cnpj-validator";

import {DocumentIsRequired} from "../errors/DocumentIsRequired";
import {IUserValidator} from "../domain/user/validator/interface/IUserValidator";
import {DocumentValidator} from "../domain/user/validator/DocumentValidator";
import {EmailValidator} from "../domain/user/validator/EmailValidator";
import bcrypt from "bcrypt";
import {TypeErrorDocument} from "../errors/TypeErrorDocument";
import {UserResponseDto} from "../domain/user/dto/UserResponseDto";


export class UserService {

    private userRepository: IUserRepository;
    private validator: UserValidator;

    constructor(){
        this.userRepository = new UserRepository();
        this.validator = new UserValidator();
    }

    async createUser(userDto: CreateUserDto): Promise<UserResponseDto | null>{
        try{
            await this.validator.validate(userDto);

            const documentType = this.determineDocument(userDto.document, userDto.isMerchant);
            const formattedDocument = this.formatDocument(userDto.document, documentType);

            const businessRuleValidators: IUserValidator[] = [
                new DocumentValidator(this.userRepository,formattedDocument),
                new EmailValidator(this.userRepository)
            ];

            for(const validator of businessRuleValidators){
                await validator.validate(userDto);
            }

            console.log("Hashing password ...")
            userDto.password = await bcrypt.hash(userDto.password, 10);

            console.log("User created successfully");

            return this.userRepository.create(userDto, formattedDocument ,documentType);

        } catch(error){
            console.log("Error during creating user ", error );
            throw error;
        }
    }

    private determineDocument = (document: string, isMerchant: boolean): "CPF" | "CNPJ" => {
        console.log("Validating document: ", document);

        if (!document) {
            throw new DocumentIsRequired("CNPJ/CPF is required to create a user");
        }

        if (isMerchant) {
            if (cnpj.isValid(document)) {
                console.log("CNPJ validated successfully for merchant.");
                return "CNPJ";
            }
            if (cpf.isValid(document)) {
                throw new TypeErrorDocument("Merchants cannot have a CPF document.");
            }
            throw new DocumentIsRequired("Provided document is not a valid CNPJ.");
        }

        if (!isMerchant) {
            if (cnpj.isValid(document)) {
                throw new TypeErrorDocument("Normal users cannot have a CNPJ document.");
            }
            if (cpf.isValid(document)) {
                console.log("CPF validated successfully for normal user.");
                return "CPF";
            }
            throw new DocumentIsRequired("Provided document is not a valid CPF.");
        }



        throw new DocumentIsRequired("Unable to determine document type.");

    }

    private formatDocument = (document: string, docType: DocType): string => {
        console.log("Formatting document: ", document, docType);
        if(docType === "CNPJ"){
            return cnpj.strip(document);
        }

        return cpf.strip(document);

    }

}
