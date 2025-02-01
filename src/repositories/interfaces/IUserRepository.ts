import { User } from "@prisma/client";
import { CreateUserDto } from "../../domain/user/dto/createUserDto";

export interface IUserRepository {
    findFirst(userDto: CreateUserDto): Promise<User | null>;
    create(userDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}