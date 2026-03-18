import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()

export class UsersRepository{

    constructor(
        @InjectRepository(User)
        private readonly repo:Repository<User>
    ){}


    async create(dto:CreateUserDto):Promise<User>{
        const user=this.repo.create(dto);
        return await this.repo.save(user);
    }

    async findAll():Promise<User[]>{
        return this.repo.find();
    };

    async findById(id:string):Promise<User|null>{
        return this.repo.findOne({where:{id}});
    };


    async update(id:string,dto:UpdateUserDto):Promise<User|null>{
         this.repo.update(id,dto);
        return this.findById(id);
    };


    async delete(id:string):Promise<void>{
        await this.repo.delete(id);
    };

    async exists(email:string):Promise<boolean>{
        const count=await this.repo.count({where:{email}});
        return count>0;
    };

    async findByEmail(email:string):Promise<User|null>{
        return this.repo.findOne({where:{email}});
    }
}