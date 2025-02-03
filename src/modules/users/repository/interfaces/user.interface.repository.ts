import {DocType, User} from "@prisma/client";
import { CreateUserDto } from "../../dtos/create-user.dto";
import {UserResponseDto} from "../../dtos/user-response.dto";

export interface UserInterfaceRepository {
    findFirst(userDto: CreateUserDto, formattedDocument: string): Promise<User | null>;
    findAllUsers(): Promise<UserResponseDto[]>;
    create(userDto: CreateUserDto, formattedDocument: string, doctype: DocType): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}