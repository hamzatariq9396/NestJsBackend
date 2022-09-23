import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(data: any) {
    const { title, description, price } = data;
    return this.repo.save({ title, description, price });
  }

  async findOne(id: string): Promise<Product> {
    
      const product = await this.repo.findOneBy({ id });
      if (!product) {
        throw new BadRequestException('Product is not by this id');
      } else {
        return product;
      }
    
  }

  async getAll():Promise<Product[]>{
    return this.repo.find() 
  }
  async delete(id:string):Promise<Product>{
    const product=await this.repo.findOneBy({id})
    if(!product){
        throw new BadRequestException("Product not found by this ID")
    }
    else{
        return this.repo.remove(product)
    }
  }
}
