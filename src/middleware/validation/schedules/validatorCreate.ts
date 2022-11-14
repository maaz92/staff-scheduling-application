import { Request, Response, NextFunction, query } from 'express';
import moment from 'moment';

import { ScheduleDTO } from '../../../dto/schedules/scheduleDTO';
import { CustomError } from '../../../utils/response/custom-error/CustomError';
import { ErrorValidation } from '../../../utils/response/custom-error/types';

const isValidDate = (date) => moment(date, 'YYYY-MM-DD', true).isValid();
const isValidLength = (length) => isNaN(length) === false && length >= 0 && length <= 24;
export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  const scheduleDTO: ScheduleDTO = req.body;
  const errorsValidation: ErrorValidation[] = [];
  if (scheduleDTO.length === undefined) {
    errorsValidation.push({ startDate: `missing request param length` });
  }
  if (scheduleDTO.date === undefined) {
    errorsValidation.push({ endDate: `missing request param date` });
  }
  if (scheduleDTO.email === undefined) {
    errorsValidation.push({ sortOrder: `missing request param email` });
  }
  if (isValidLength(scheduleDTO.length) === false) {
    errorsValidation.push({ length: `length must be a number between 0 and 24. '${scheduleDTO.length}' provided` });
  }
  if (isValidDate(scheduleDTO.date) === false) {
    errorsValidation.push({ date: `date '${scheduleDTO.date}' is invalid. Expected format is 'YYYY-MM-DD'` });
  }
  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create schedule validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }
  return next();
};
