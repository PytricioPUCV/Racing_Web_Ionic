import { Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';

declare module 'express-serve-static-core' {
  interface Request {
    clientTimezone?: string;
  }
}

export const timezoneMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const timezone = req.headers['x-timezone'] as string || 'America/Santiago';
  req.clientTimezone = timezone;
  next();
};
