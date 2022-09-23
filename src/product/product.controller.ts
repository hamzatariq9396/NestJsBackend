import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  CreateProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
  @Get(':id')
  FindProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
  @Get()
  getAllProducts() {
    return this.productService.getAll();
  }
  @Delete(':id')
  DeleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
  
}
