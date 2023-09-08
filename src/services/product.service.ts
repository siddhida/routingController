import { injectable, singleton } from "tsyringe";
import { Product } from "./../entities/product.entity";
import { Repository, getRepository } from "typeorm";
import { Param, Body, QueryParam } from "routing-controllers";

@singleton()
export class ProductService {
private readonly productRepo: Repository<Product>;

constructor(){
  this.productRepo = getRepository(Product);
}


async getAllProducts(): Promise<Product[]> {
    // const userRepository = getRepository(Product);
    console.log("Service Products ==== ");
    return this.productRepo.find();
}

async getAllProductSortByMultipleColumn(): Promise<Product[]>{
    return this.productRepo.find({
        where: {
            /* conditons, if any */
          },
          // sort by multiple columns
          order: {
            price: 'ASC',
            shippingFee: 'ASC',
            yearOfManufacture: 'DESC',
          },
    })
}

// async getDesiredSortedProducts(@QueryParam('keys', {isArray: true, type:'any'}) key:any): Promise<Product[]>{
async getDesiredSortedProducts(@QueryParam('keys') keys:any): Promise<Product[]>{
    return this.productRepo.find({
        where: {
            /* conditons, if any */
          },
          // sort by multiple columns
          order: keys
    });
}

// async getRandomlySortedProucts(@QueryParam(name: string, options?: ParamOptions)): Promise<Product[]>{

//     return this.productRepo.find();
// }


async getOneProduct(@Param('id') id: number): Promise<Product|string> {
  // const userRepository = getRepository(User);
  // console.log("ID is ==== ", id);
  const resp = await this.productRepo.findOneOrFail({where: {id}});
  // console.log("Resp ==== ", resp);
  if(resp){
    return resp;
  }
  return 'Not Found';
}

async addProduct(@Body() prod:any):Promise<Product | string>{
//   console.log("Body ==== ", prod);
  // const productRepository = getRepository(Product);
  let resp = await this.productRepo.save(this.productRepo.create(prod));
  // const resp = await productRepo.save(productRepository.create({ username: 'peela', email: 'peela@here.com' }));
//   console.log("Resp ==== ", resp);
  return "Saved"
}




// async addUser(@Body() user:User): Promise<User|string> {
//   const userRepository = getRepository(User);
//   console.log("Data Service body ==== ", user);
//   // const usr = userRepository.create({ username, email });
//   // const resp = await userRepository.save(userRepository.create({ username: 'Gregg', email: 'gregg@here.com' }));
//   // const resp = await userRepository.save(userRepository.create({username: user.username, email:user.email}));
//   const resp = await userRepository.save(userRepository.create(user));
//   console.log("Response generated ==== ", resp);
//   return 'Not Saved';;
// }

}