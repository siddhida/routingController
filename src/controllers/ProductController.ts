import { JsonController, Get, Param, Body, Post, UseBefore, QueryParams } from "routing-controllers";
import { container, singleton } from "tsyringe";
import { Product } from './../entities/product.entity';
import { ProductService } from '../services/product.service';
import { Any } from "typeorm";

@singleton()
@JsonController('/products')
export class ProductController {
  // constructor(@inject(UserService) private readonly userService: UserService) {}
  constructor( private readonly productService: ProductService) {
    this.productService = container.resolve(ProductService);
  }

  @Get('/prod')
  async getAllProducts(): Promise<Product[]> {
    console.log("Get All Products ==== ");
    return this.productService.getAllProducts();
  }

  @Get('/sort')
  async getSorted(): Promise<Product[]> {
    // console.log('do something in GET function...', id);
    // return 'This action returns user # ' + id;
    return this.productService.getAllProductSortByMultipleColumn();
  }

  @Get('/desiredsorting')
  async getDesiredSortedProducts(@QueryParams() key:any): Promise<Product[]>{
    console.log("Key ==== ", key);
    return this.productService.getDesiredSortedProducts(key);
  }


  @Get('/:id')
  async getOneUser(@Param('id') id: number): Promise<Product | string> {
    console.log("ID ==== ", id);
    return this.productService.getOneProduct(id);
  }

  @Post('/prod')
  // @UseBefore(raw({ type: "application/json" }))
  async createUser(@Body() prod: any): Promise<Product | string> {
    // console.log('Post FUNCT ==== ', prod);

    return this.productService.addProduct(prod);
  }

  @Post('/data')
  postData(@Body() data: any) {
    console.log("Data received at demo ==== ", data);
    return { message: 'Data received successfully', data };
  }

  // @Post()
  // async createUser(@Req() req: any, @Res() res:any): Promise<User | string> {
  //   console.log('Post FUNCT ==== ', req);

  //   return this.userService.addUser(req);
  // }


  @Post('/add')
  store(@Body() message: any) {
    return `request had body:
          "${JSON.stringify(message)}"`;
  }


      // const test = JSON.stringify(user);
    // console.log('Stringified ==== ', test);
  // @Put('/:id')
  // async updateUser(@Param('id') id: number, @Body() user: User): Promise<User | undefined> {
  //   await this.userRepository.update(id, user);
  //   return this.userRepository.findOne(id);
  // }

  // @Delete('/:id')
  // async deleteUser(@Param('id') id: number): Promise<boolean> {
  //   const deleteResult = await this.userRepository.delete(id);
  //   return !!deleteResult.affected;
  // }
}

