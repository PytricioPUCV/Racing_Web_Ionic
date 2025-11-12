declare module 'express-xss-sanitizer' {
  import { RequestHandler } from 'express';

  interface XssOptions {
    allowedKeys?: string[];
    allowedTags?: string[];
  }

  export function xss(options?: XssOptions): RequestHandler;
}
