import {DocType, Prisma, PrismaClient, User} from "@prisma/client";
import { IUserRepository } from "./interfaces/IUserRepository";
import { CreateUserDto } from "../domain/user/dto/CreateUserDto";
import prisma from "../database/prismaClient";
import {UserResponseDto} from "../domain/user/dto/UserResponseDto";

export class UserRepository implements IUserRepository {

    private prisma: PrismaClient = prisma;

    findFirst = async (userDto: CreateUserDto, formattedDocument: string): Promise<User | null> => {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: userDto.email },
                    {document: formattedDocument},
                ]
            }
        });
    };

   create = async (userDto: CreateUserDto, formattedDocument: string, doctype: DocType):Promise<UserResponseDto> => {
    return this.prisma.user.create({
        data: {
            ...userDto,
            document: formattedDocument,
            documentType: doctype
        },
        select: {
            fullName: true,
            email: true,
            isMerchant: true,
            document: true,
            documentType: true
        }
    });
   };
    
    findByEmail = async(email: string): Promise<User | null> => {
        return this.prisma.user.findUnique({
            where: {email: email}
        });
    };

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: id },
        });
    }



}
