import { Prisma, PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "./interfaces/IUserRepository";
import { CreateUserDto } from "../domain/user/dto/createUserDto";

export class UserRepository implements IUserRepository {
    
    private prisma: PrismaClient;

    constructor(prisma?: PrismaClient){
        this.prisma = prisma || new PrismaClient();
    };

    findFirst = async (userDto: CreateUserDto): Promise<User | null> => {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    {email: userDto.email},
                    {cpf: userDto.cpf},
                    {cnpj: userDto.cnpj}
                ]
            }
        });
    };

   create = async (userDto: CreateUserDto):Promise<User> => {
    return this.prisma.user.create({
        data: {
            ...userDto
        }
    });
   };
    
    findByEmail = async(email: string): Promise<User | null> => {
        return this.prisma.user.findUnique({
            where: {email: email}
        });
    };

    findById = async(id: string): Promise<User | null> => {
        return this.prisma.user.findUnique({
            where: {id: id}
        });
    };
    

}
