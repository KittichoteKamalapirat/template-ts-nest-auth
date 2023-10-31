import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export type RequestWithSession = Request & {
  // channelId is channel.id (not youtube id)
  session?: Session & { channelId?: string; userId: string; teamId: string }; 
};

export type MyContext = {
  req: RequestWithSession;
  res: Response;
  redis: Redis;
};
