// Stripe needs this when construct a webhook event
import { Response } from 'express';
import { json } from 'body-parser';
import RequestWithRawBody from '../types/requestWithRawBody.interface';

function rawBodyMiddleware() {
  return json({
    verify: (request: RequestWithRawBody, _: Response, buffer: Buffer) => {
      if (request.url === '/webhooks/stripe' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawBodyMiddleware;
