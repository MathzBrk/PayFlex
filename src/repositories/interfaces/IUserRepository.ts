import { User } from "@prisma/client";
import { CreateUserDto } from "../../domain/user/createUserDto";

export interface IUserRepository {
    findFirst(userDto: CreateUserDto): Promise<User | null>;
    create(userDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}