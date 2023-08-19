import { auth, UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { promisifyMiddleware } from '~/lib/promisifyMiddleware';

export default defineEventHandler(async (event) => {
  if (event.path !== '/api/saveProgress') {
    return;
  }

  const checkJwt = auth({
    audience: process.env.AUTH0_API_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_API_ISSUER_BASE_URL,
  });

  const checkJwtPromise = promisifyMiddleware(checkJwt);

  try {
    await checkJwtPromise(event.node.req, event.node.res);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const { statusCode, message } = error;

      throw createError({
        statusCode,
        statusMessage: message,
      });
    }

    throw error;
  }
});
