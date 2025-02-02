import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateIf } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsNumber()
    @IsPositive()
    balance?: number;

    @IsBoolean()
    @IsNotEmpty()
    isMerchant!: boolean;

    @ValidateIf(u => !u.isMerchant)
    @IsString()
    @IsNotEmpty()
    cpf?: never;


    @ValidateIf(u => u.isMerchant)
    @IsString()
    @IsNotEmpty()
    cnpj?: string;


}