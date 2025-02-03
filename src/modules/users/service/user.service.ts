import {DocType} from '@prisma/client';
import {CreateUserDto} from '../dtos/create-user.dto';
import {UserInterfaceRepository} from '../repository/interfaces/user.interface.repository';
import {UserRepository} from '../repository/user.repository';
import {cnpj, cpf} from "cpf-cnpj-validator";
import {User} from "@prisma/client";

import {DocumentIsRequiredError} from "../../../errors/document-is-required.error";
import {UserInterfaceValidator} from "../validators/interface/user.interface.validator";
import {DocumentValidator} from "../validators/document.validator";
import {EmailValidator} from "../validators/email.validator";
import bcrypt from "bcrypt";
import {TypeErrorDocument} from "../../../errors/type-error-document";
import {UserResponseDto} from "../dtos/user-response.dto";
import {DtoValidator} from "../../../utils/dto.validator";
import {plainToInstance} from "class-transformer";



export class UserService {

    private userRepository: UserInterfaceRepository;
    private validator: DtoValidator;

    constructor(){
        this.userRepository = new UserRepository();
        this.validator = new DtoValidator();
    }

    async createUser(userDto: CreateUserDto): Promise<UserResponseDto | null>{
        try{
            const createUserDto = plainToInstance(CreateUserDto,userDto);
            await this.validator.validate(createUserDto);

            const documentType = this.determineDocument(createUserDto.document, createUserDto.isMerchant);
            const formattedDocument = this.formatDocument(createUserDto.document, documentType);

            const businessRuleValidators: UserInterfaceValidator[] = [
                new DocumentValidator(this.userRepository,formattedDocument),
                new EmailValidator(this.userRepository)
            ];

            for(const validator of businessRuleValidators){
                await validator.validate(createUserDto);
            }

            console.log("Hashing password ...")
            createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

            console.log("User created successfully");

            return this.userRepository.create(createUserDto, formattedDocument ,documentType);

        } catch(error){
            console.log("Error during creating user ", error );
            throw error;
        }
    }



    private determineDocument = (document: string, isMerchant: boolean): "CPF" | "CNPJ" => {
        console.log("Validating document: ", document);

        if (!document) {
            throw new DocumentIsRequiredError("CNPJ/CPF is required to create a user");
        }

        if (isMerchant) {
            if (cnpj.isValid(document)) {
                console.log("CNPJ validated successfully for merchant.");
                return "CNPJ";
            }
            if (cpf.isValid(document)) {
                throw new TypeErrorDocument("Merchants cannot have a CPF document.");
            }
            throw new DocumentIsRequiredError("Provided document is not a valid CNPJ.");
        }

        if (!isMerchant) {
            if (cnpj.isValid(document)) {
                throw new TypeErrorDocument("Normal users cannot have a CNPJ document.");
            }
            if (cpf.isValid(document)) {
                console.log("CPF validated successfully for normal user.");
                return "CPF";
            }
            throw new DocumentIsRequiredError("Provided document is not a valid CPF.");
        }

        throw new DocumentIsRequiredError("Unable to determine document type.");

    }

    findAllUsers = async (): Promise<UserResponseDto[]> => {

        const users: UserResponseDto[] = await this.userRepository.findAllUsers();

        if (users.length === 0) {
            console.error("No users found.");
        }

        console.log(`${users.length} users found.`);
        return users;
    }

        private formatDocument = (document: string, docType: DocType): string => {
        console.log("Formatting document: ", document, docType);
        if(docType === "CNPJ"){
            return cnpj.strip(document);
        }

        return cpf.strip(document);

    }

}
