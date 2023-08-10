import { NodeMiddleware } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';

export function promisifyMiddleware(middleware: NodeMiddleware) {
  return (req: IncomingMessage, res: ServerResponse) =>
    new Promise<Error | void>((resolve, reject) => {
      middleware(req, res, (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      });
    });
}
