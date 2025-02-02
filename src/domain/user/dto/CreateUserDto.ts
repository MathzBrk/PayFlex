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
    @IsOptional()
    balance?: number;

    @IsBoolean()
    @IsNotEmpty()
    isMerchant!: boolean;

    @IsString()
    @IsNotEmpty()
    document!: string;



}