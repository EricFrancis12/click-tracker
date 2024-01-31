import { Request, Response, NextFunction } from 'express';

export default async function auth(req: Request, res: Response, next: NextFunction) {
    // Custom auth logic ...

    next();
}
