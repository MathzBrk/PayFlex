import {DocType, User} from "@prisma/client";
import { CreateUserDto } from "../../domain/user/dto/create-user.dto";
import {UserResponseDto} from "../../domain/user/dto/user-response.dto";

export interface UserInterfaceRepository {
    findFirst(userDto: CreateUserDto, formattedDocument: string): Promise<User | null>;
    findAllUsers(): Promise<UserResponseDto[]>;
    create(userDto: CreateUserDto, formattedDocument: string, doctype: DocType): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}