import typeis from 'type-is';
import { NodeMiddleware } from 'h3';

const middleware: NodeMiddleware = (req) => {
  // @ts-ignore Replicating express is()
  req.is = (mimeType: string) => typeis(req, mimeType);
};

export default fromNodeMiddleware(middleware);
