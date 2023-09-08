import { Request, Response } from 'express';

const RawBodyMiddleware = (req: Request, res: Response, next: () => void) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', () => {
    // const rawBody = Buffer.concat(body)
    // req['rawBody'] = rawBody
    switch (req.header('content-type')) {
      case 'application/json':
        req.body = JSON.parse(body)
        break
      // add more body parsing if needs be
      default:
    }
    next()
  })
  req.on('error', () => {
    res.sendStatus(400)
  })
}

export default RawBodyMiddleware

//=============================================================================================================

// import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
// import { Request, Response, NextFunction } from 'express';

// @Middleware({ type: 'before' })
// export class BodyParsingMiddleware implements ExpressMiddlewareInterface {
//   use(request: Request, response: Response, next: NextFunction): void {
//   console.log("Here midleware .method ==== ", request);

//     if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
//             if (request.is('application/json')) {
//         let rawData = '';
//         request.on('data', (chunk) => {
//           console.log("Chunk ==== ", chunk);
//           rawData += chunk;
//         });
//         console.log("Raw Data ==== ", rawData);
//         request.on('end', () => {
//           try {
//             const parsedData = JSON.parse(rawData);
//             request.body = parsedData;
//             console.log("Here Two ==== ", parsedData);
//             next();
//           } catch (error) {
//             console.log("Here Three ==== ");
//             response.status(400).json({ error: 'Invalid JSON format' });
//           }
//         });
//       } else {
//         console.log("Here Four ==== ");
//         response.status(415).json({ error: 'Unsupported Media Type' });
//       }
//     } else {
//       next();
//     }
//   }
// }

//=============================================================================================================

// import {AsyncLocalStorage} from "async_hooks";
// import express from "express";
// import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";
// import { singleton } from "tsyringe";

// export interface ObservabilityContext {
//     req: {
//         method: string;
//         url:string;
//         userAgentShort?:string;
//     };
//     [prop: string]: any;
// }
// export const observabilityStorage = new AsyncLocalStorage<ObservabilityContext>();

// export function getObservabilityContext() {
//     return observabilityStorage.getStore();
// }



// @singleton()
// @Middleware({ type: "before" })
// export class ObservabilityMiddleware implements ExpressMiddlewareInterface {
//   use = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     observabilityStorage.run(
//       {
//           req: {
//               method: req.method,
//               url: req.url,
//           },
//       },
//       () => next(),
//     );
//   };
// }