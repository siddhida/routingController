import "reflect-metadata"; // Import this at the top
import express, { urlencoded, Express } from "express";
import httpContext from 'express-http-context';
import bodyParser from "body-parser";
import { useExpressServer, createExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";
import { container } from "tsyringe";
import { PostController } from "./controllers/PostController";
import { CommentController } from "./controllers/CommentController";
// import  {ObservabilityMiddleware}  from "./middlewares/observability-context";

// const middlewares = [ObservabilityMiddleware]
const { config } = require("../ormconfig");
const PORT = 3005;
const app: Express = express();
let containers = [UserController, ProductController];
//===============================================
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors() as RequestHandler);
// app.use(bodyParser.json());
// app.use(httpContext.middleware);

// console.log("ObservabilityMiddleware ==== ", ObservabilityMiddleware);
// app.post('/', (req, res) => {
  //   console.log("Express ==== ", req.body); // Log the request body
  //   // Your code to handle the request
  //   return res.send(req.body);
  // });
//=====================================

createConnection(config)
.then(async (connection) => {
  console.log("Connected to the database");
  container.resolve(ProductController);
  container.resolve(UserController);
 //================================================================ 
  // const app = createExpressServer({
  //   controllers: [UserController, ProductController], // Add your controllers here
  // });

  // app.use(express.json());

  // app.listen(PORT, () => {
  //   console.log(`Server is running on PORT ${PORT}`);
  // });

 //================================================================ 
useExpressServer(app,{
  // middlewares,
  controllers: [ProductController, UserController, PostController, CommentController],
  // controllers: [UserController],
  // defaultErrorHandler:false,
  // validation: {
  //   whitelist: true,
  //   forbidNonWhitelisted:true,
  //   forbidUnknownValues:true,
  // }
}).listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}`);
})
 //================================================================ 

//  useExpressServer(app, {
//   controllers: [UserController], // we specify controllers we want to use
//   defaultErrorHandler: false
// }).listen(PORT, ()=>{
//   console.log(`Server is running on PORT ${PORT}`);
// })
//================================================================ 


})
.catch((error) => {
  console.error("Error connecting to the database:", error);
});


