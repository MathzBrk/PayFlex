import { CreateUserDto } from "../domain/user/dto/create-user.dto";
import { UserService } from "../services/user.service";
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

   public async findAll(req: Request, res: Response){
        console.log("Request received to get all users");
        try{
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch(error: any){
            return res.status(500).json({ error: error.message });
        }
   }


}