import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const API_KEY = process.env.API_KEY;
  const externalApiKey = req.headers['x-api-key'];

  if (!externalApiKey || API_KEY !== externalApiKey) {
    return res
      .status(401)
      .json({ error: 'Invalid or undefined authorization header' });
  }

  return next();
};
