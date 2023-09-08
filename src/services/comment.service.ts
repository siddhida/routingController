import { singleton } from "tsyringe";
import { Comment } from "./../entities/comment.entity";
import { Repository, getRepository } from "typeorm";
import { Param, Body } from "routing-controllers";
import { Post } from "./../entities/post.entity";

@singleton()
export class CommentService {
private readonly commentRepo: Repository<Comment>;
private readonly postRepo: Repository<Post>;

constructor(){
  this.commentRepo = getRepository(Comment);
  this.postRepo = getRepository(Post);
}


  async getAllComments(): Promise<Comment[]> {
    // const userRepository = getRepository(User);
    return this.commentRepo.find({
      relations:['post']
    });
}

async getAllsortedCommentsByPost(): Promise<Comment[]|string|Comment>{

  const userWithFilteredAndOrderedPosts = await this.commentRepo.createQueryBuilder()
  .select([
    'comment.id AS comment_id',
    'comment.commentContent AS comment_description',
    'post.id AS post_id',
    'post.title AS post_title',
    // 'post.whole_post_details AS whole_post_details',
  ])
  .from(Comment, 'comment')
  .innerJoin(Post, 'post', 'post.id = comment.postId')
  .groupBy('comment.id')
  .addGroupBy('comment.id')
  .addGroupBy('post.id')
  .orderBy('comment.postId')
  .getRawMany();

  if (userWithFilteredAndOrderedPosts) {
  console.log(' result ==== ',userWithFilteredAndOrderedPosts);
  return userWithFilteredAndOrderedPosts;
} else {
  console.log('User not found ==== ');
}

  // let res = await this.commentRepo.find({
  //   relations:['post'],
  // })
  // console.log("Resp ==== ", res);

// const postId = 1;
// // const filterCondition = 'your_filter_condition';
// const groupByColumn = 'id';
// const orderByColumn = 'id';
// const orderDirection = 'ASC';

// const userWithFilteredAndOrderedPosts = await this.commentRepo
//   .createQueryBuilder('comment')
//   .leftJoinAndSelect('comment.post', 'post')
//   .where('comment.id = :id', { postId })
//   // .andWhere('post.your_column = :filterCondition', { filterCondition })
//   .groupBy(`comment.id, post.${groupByColumn}`)
//   .orderBy(`comment.commentContent`, 'ASC')
//   .addOrderBy(`post.${orderByColumn}`, orderDirection)
//   .getMany();

// if (userWithFilteredAndOrderedPosts) {
//   console.log(' result ==== ',userWithFilteredAndOrderedPosts);
//   return userWithFilteredAndOrderedPosts;
// } else {
//   console.log('User not found ==== ');
// }


  // return Promise.resolve('Not found');
}

// async getOneUser(@Param('id') id: number): Promise<Comment|string> {
//   // const userRepository = getRepository(User);
//   // console.log("ID is ==== ", id);
//   const resp = await this.userRepo.findOneOrFail({where: {id}});
//   // console.log("Resp ==== ", resp);
//   if(resp){
//     return resp;
//   }
//   return 'Not Found';
// }

// async addUser(@Body() user:any):Promise<Comment | string>{
//   // console.log("Body ==== ", user);
//   // const userRepository = getRepository(User);
//   let resp = await this.userRepo.save(this.userRepo.create(user));
//   // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
//   // console.log("Resp ==== ", resp);
//   return "Saved"
// }




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