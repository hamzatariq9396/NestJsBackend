import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

// Create the User
  create(name: string, email: string, password: string) {
    const user = this.repo.create({ name, email, password });
    return this.repo.save(user);
  }
  // Find ALl user in a ARRAY
 findAll(): Promise<User[]> {
    return this.repo.find();
  }
// Find a User By id 
async findOne(id: number) : Promise<User> {
    
    const user= await this.repo.findOneBy({id});
        if(!user){
          throw new BadRequestException('User is not found');  
        } 
        else {
            return user
        }
  }
// FInd user by email
 async findByEmail(email: string):Promise<User[]>{
    const user= await this.repo.findBy({email})
    if(!user){
      throw new BadRequestException('Not found'); 
    }
    else{
      return user
    }
    
  }
// Update user 
  async update(id: number, attars:Partial<User>) {
    let user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found'); 
    }
    this.repo.update(id,attars);
    return "user is updated Successfully"
  }
// Remove User by id 
  async remove(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User is not found ');  
    }
    return this.repo.remove(user);
  }
}
