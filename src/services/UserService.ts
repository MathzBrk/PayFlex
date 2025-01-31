import { User } from '@prisma/client';
import { CreateUserDto } from '../domain/user/createUserDto';
import { UserValidator } from '../domain/user/validador/userCreateValidador';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {

    private userRepository: IUserRepository;
    private validator: UserValidator;

    constructor(){
        this.userRepository = new UserRepository();
        this.validator = new UserValidator(this.userRepository);
    }
    
    async createUser(userDto: CreateUserDto): Promise<User | null>{
        try{
            console.log('Validating userDto...', userDto);
            await this.validator.validate(userDto);
        } catch(error){
            console.log("Error during creating user ", error );
            throw error;
        }

        return this.userRepository.create(userDto);
    }
}
