import {DocType, Prisma, PrismaClient, User} from "@prisma/client";
import { UserInterfaceRepository } from "./interfaces/user.interface.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import prisma from "../../../database/prisma-client";
import {UserResponseDto} from "../dtos/user-response.dto";

export class UserRepository implements UserInterfaceRepository {

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

    findAllUsers = async (): Promise<UserResponseDto[]> => {
        return this.prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                isMerchant: true,
                document: true,
                documentType: true,
            }
        })
    }

   create = async (userDto: CreateUserDto, formattedDocument: string, doctype: DocType):Promise<UserResponseDto> => {
    return this.prisma.user.create({
        data: {
            ...userDto,
            document: formattedDocument,
            documentType: doctype
        },
        select: {
            id: true,
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
