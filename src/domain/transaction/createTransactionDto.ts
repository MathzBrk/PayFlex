import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto{
    @IsNumber()
    @IsNotEmpty()
    value!:number

    @IsString()
    @IsNotEmpty()
    payer!: string

    @IsString()
    @IsNotEmpty()
    payee!: string

}