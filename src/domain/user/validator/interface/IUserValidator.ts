import {CreateUserDto} from "../../dto/CreateUserDto";

export interface IUserValidator {
    validate(userDto: CreateUserDto): Promise<void>;
}