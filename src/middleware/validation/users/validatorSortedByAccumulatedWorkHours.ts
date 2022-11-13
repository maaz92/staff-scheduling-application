import { Request, Response, NextFunction } from 'express';

export const validatorSortedByAccumulatedWorkHours = async (req: Request, res: Response, next: NextFunction) => {
  return next();
};
