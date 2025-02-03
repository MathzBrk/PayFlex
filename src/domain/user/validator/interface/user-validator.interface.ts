import {CreateUserDto} from "../../dto/create-user.dto";

export interface UserValidatorInterface {
    validate(userDto: CreateUserDto): Promise<void>;
}