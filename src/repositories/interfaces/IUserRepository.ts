import {DocType, User} from "@prisma/client";
import { CreateUserDto } from "../../domain/user/dto/CreateUserDto";
import {UserResponseDto} from "../../domain/user/dto/UserResponseDto";

export interface IUserRepository {
    findFirst(userDto: CreateUserDto, formattedDocument: string): Promise<User | null>;

    create(userDto: CreateUserDto, formattedDocument: string, doctype: DocType): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}