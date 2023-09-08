import { JsonController, Get, Param, Body } from "routing-controllers";
import { container, singleton } from "tsyringe";
import {Post} from './../entities/post.entity';
import { PostService } from '../services/post.service';

@singleton()
@JsonController('/posts')
export class PostController {
  // constructor(@inject(UserService) private readonly userService: UserService) {}
  constructor( private readonly postService: PostService) {
    this.postService = container.resolve(PostService);
  }

  @Get('/')
  async getAllPosts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  // @Get('/:id')
  // getOne (@Param('id') id: number): string {
  //   console.log('do something in GET function...', id);
  //   return 'This action returns user # ' + id;
  // }

  // @Get('/:id')
  // async getOneUser(@Param('id') id: number): Promise<User | string> {
  //   console.log("ID ==== ", id);
  //   return this.userService.getOneUser(id);
  // }

  // @Post('/usr')
  // // @UseBefore(raw({ type: "application/json" }))
  // async createUser(@Body() user: any): Promise<User | string> {
  //   // console.log('Post FUNCT ==== ', user);

  //   return this.userService.addUser(user);
  // }

  // @Post('/data')
  // postData(@Body() data: any) {
  //   console.log("Data received at demo ==== ", data);
  //   return { message: 'Data received successfully', data };
  // }

  // @Post()
  // async createUser(@Req() req: any, @Res() res:any): Promise<User | string> {
  //   console.log('Post FUNCT ==== ', req);

  //   return this.userService.addUser(req);
  // }


  // @Post('/add')
  // store(@Body() message: any) {
  //   return `request had body:
  //         "${JSON.stringify(message)}"`;
  // }


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
