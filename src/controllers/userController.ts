import { CreateUserDto } from "../domain/user/dto/createUserDto";
import { UserValidator } from "../domain/user/validator/userCreateValidador";
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
        const newUser = await this.userService.createUser(userDto);
        console.log("New user created:", newUser);
        res.status(201).json(newUser);
    } catch(error: any){
        return res.status(400).json({ error: error.message });
    }
   }


}