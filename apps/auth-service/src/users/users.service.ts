import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { BusinessException } from '@wms/common';
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {

    constructor(private readonly usersRepository:UsersRepository){}


   async create(dto: CreateUserDto): Promise<User> {
  const exists = await this.usersRepository.exists(dto.email); // ← exists
  if (exists) {
    throw new BusinessException('Bu email allaqachon mavjud');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  return this.usersRepository.create({
    ...dto,
    password: hashedPassword,
  });
}

    async findAll():Promise<User[]>{
        return this.usersRepository.findAll();
    };

    async findById(id:string):Promise<User>{
        const user=await this.usersRepository.findById(id);
        if(!user){
            throw new NotFoundException('User not Found')
        };
        return user;

    }

    async findByEmail(email:string):Promise<User|null>{
        return this.usersRepository.findByEmail(email);

    }

    async update(id:string,dto:UpdateUserDto):Promise<User>{
        await this.findById(id);

         if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.usersRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException('Foydalanuvchi');
    }
    return updated;
    }

    async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.usersRepository.delete(id);
  }
}
