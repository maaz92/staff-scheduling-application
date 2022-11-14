import { Request, Response, NextFunction, query } from 'express';
import moment from 'moment';

import { CustomError } from '../../../utils/response/custom-error/CustomError';
import { ErrorValidation } from '../../../utils/response/custom-error/types';

const isValidDate = (date) => moment(date, 'YYYY-MM-DD', true).isValid();
const getMomentDate = (date) => moment(date, 'YYYY-MM-DD', true);
export const validatorSortedByAccumulatedWorkHours = async (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate, sortOrder } = req.query;
  const errorsValidation: ErrorValidation[] = [];
  if (startDate === undefined) {
    errorsValidation.push({ startDate: `missing query param startDate` });
  }
  if (endDate === undefined) {
    errorsValidation.push({ endDate: `missing query param endDate` });
  }
  if (sortOrder === undefined) {
    errorsValidation.push({ sortOrder: `missing query param sortOrder` });
  }
  if (isValidDate(startDate) === false) {
    errorsValidation.push({ startDate: `startDate '${startDate}' is invalid. Expected format is 'YYYY-MM-DD'` });
  }
  if (isValidDate(endDate) === false) {
    errorsValidation.push({ endDate: `endDate '${endDate}' is invalid. Expected format is 'YYYY-MM-DD'` });
  }
  if (isValidDate(startDate) && isValidDate(endDate) && getMomentDate(startDate).isAfter(getMomentDate(endDate))) {
    errorsValidation.push({ invalidDateRange: `startDate ${startDate} cannot be after endDate '${endDate}'` });
  }
  if (sortOrder !== 'asc' && sortOrder !== 'desc') {
    errorsValidation.push({ sortOrder: `Sort Order can only be 'asc' or 'desc'. Provided '${sortOrder}'` });
  }
  console.log(` Error validation length = ${errorsValidation.length} `);
  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'List user sorted by accumulated work hours validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }
  return next();
};
