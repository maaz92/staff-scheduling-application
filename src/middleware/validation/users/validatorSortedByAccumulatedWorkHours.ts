import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
export const validatorSortedByAccumulatedWorkHours = async (req: Request, res: Response, next: NextFunction) => {
  console.log(moment('2012-05-22', 'YYYY-MM-DD', true).isValid()); //true
  return next();
};
