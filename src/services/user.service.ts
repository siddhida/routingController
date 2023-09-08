import { injectable, singleton } from "tsyringe";
import { User } from "./../entities/user.entity";
import { Repository, getRepository } from "typeorm";
import { Param, Body } from "routing-controllers";

@singleton()
export class UserService {
private readonly userRepo: Repository<User>;

constructor(){
  this.userRepo = getRepository(User);
}


  async getAllUsers(): Promise<User[]> {
    // const userRepository = getRepository(User);
    return this.userRepo.find();
}

async getOneUser(@Param('id') id: number): Promise<User|string> {
  // const userRepository = getRepository(User);
  // console.log("ID is ==== ", id);
  const resp = await this.userRepo.findOneOrFail({where: {id}});
  // console.log("Resp ==== ", resp);
  if(resp){
    return resp;
  }
  return 'Not Found';
}

async addUser(@Body() user:any):Promise<User | string>{
  // console.log("Body ==== ", user);
  // const userRepository = getRepository(User);
  let resp = await this.userRepo.save(this.userRepo.create(user));
  // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
  // console.log("Resp ==== ", resp);
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