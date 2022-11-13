import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import * as UserService from '../../services/users';

export const listSortedByAccumulatedWorkHours = async (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate, sortOrder } = req.query;

  try {
    const users = await UserService.listSortedByAccumulatedWorkHours(startDate, endDate, sortOrder);
    res.customSuccess(200, 'List of users sorted by accumulated work hours.', users);
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, customError);
    }
    return next(customError);
  }
};
