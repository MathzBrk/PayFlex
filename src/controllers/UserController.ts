import { CreateUserDto } from "../domain/user/dto/CreateUserDto";
import { UserValidator } from "../domain/user/validator/UserCreateValidador";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import {Request, Response} from 'express';

export class UserController {

    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }


   public async createUser(req: Request, res: Response){
    console.log("Request received:", req.body);
    try{
        const userDto: CreateUserDto = req.body;
        const userResponseDto = await this.userService.createUser(userDto);
        console.log("New user created:", userResponseDto);
        res.status(201).json(userResponseDto);
    } catch(error: any){
        return res.status(400).json({ error: error.message });
    }
   }


}