import {CreateUserDto} from "../../dto/create-user.dto";

export interface UserInterfaceValidator {
    validate(userDto: CreateUserDto): Promise<void>;
}