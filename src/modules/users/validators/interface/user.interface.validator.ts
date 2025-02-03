import {CreateUserDto} from "../../dtos/create-user.dto";

export interface UserInterfaceValidator {
    validate(userDto: CreateUserDto): Promise<void>;
}