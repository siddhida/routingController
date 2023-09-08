import {AsyncLocalStorage} from "async_hooks";
import express from "express";
import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";
import { singleton } from "tsyringe";

export interface ObservabilityContext {
    req: {
        method: string;
        url:string;
        userAgentShort?:string;
    };
    [prop: string]: any;
}
export const observabilityStorage = new AsyncLocalStorage<ObservabilityContext>();

// export function getObservabilityContext() {
//   console.log("Hello ==== ");
//     return observabilityStorage.getStore();
// }



@singleton()
@Middleware({ type: "before" })
export class ObservabilityMiddleware implements ExpressMiddlewareInterface {
  use = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("Req method ==== ", req.method);
    console.log("Req url ==== ", req.url);
    console.log("Req body ==== ", req.body);
    observabilityStorage.run(
      {
          req: {
              method: req.method,
              url: req.url,
          },
      },
      () => next(),
    );
  };
}



// import { Request, Response } from 'express';

// const RawBodyMiddleware = (req: Request, res: Response, next: () => void) => {
//   console.log("Req HEADER ==== ", req.header);
//   let body = ''
//   req.on('data', chunk => {
//     body += chunk
//   })
//   req.on('end', () => {
//     // const rawBody = Buffer.concat(body)
//     // req['rawBody'] = rawBody
//     switch (req.header('content-type')) {
//       case 'application/json':
//         req.body = JSON.parse(body)
//         break
//       // add more body parsing if needs be
//       default:
//     }
//     next()
//   })
//   req.on('error', () => {
//     res.sendStatus(400)
//   })
// }

// export default RawBodyMiddleware



// import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
// import { Request, Response, NextFunction } from 'express';

// @Middleware({ type: 'before' })
// export class BodyParsingMiddleware implements ExpressMiddlewareInterface {
//   use(request: Request, response: Response, next: NextFunction): void {
//   console.log("Here midleware .method ==== ");

//     if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
//       const kHeadersSymbol = Object.getOwnPropertySymbols(request).find(
//         symbol => symbol.description === 'kHeaders'
//       );
    
//       if (kHeadersSymbol) {
//         const headers = (request as any)[kHeadersSymbol];
//         console.log("Headers: ==== ", headers['content-type']);
//         if(headers['content-type'] == 'application/json'){
//           console.log("Inside APp JSON ==== ")
//           let rawData = '';
//           request.on('data', (chunk) => {
//             console.log("Chunk ==== ", chunk);
//             rawData += chunk;
//           });
//           request.on('error', (error) => {
//             console.error('Request error: ==== ', error);
//           });
//           console.log("Raw Data ==== ", rawData);
//           request.on('end', () => {
//             try {
//               const parsedData = JSON.parse(rawData);
//               request.body = parsedData;
//               console.log("Here Two ==== ", parsedData);
//               next();
//             } catch (error) {
//               console.log("Here Three ==== ");
//               response.status(400).json({ error: 'Invalid JSON format' });
//             }
//           });
//         }else {
//           console.log("Here Four ==== ");
//         response.status(415).json({ error: 'Unsupported Media Type' });
//         }
//       }
//     } else {
//       next();
//     }
//   }
// }



