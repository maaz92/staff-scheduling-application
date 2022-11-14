import { Request, Response, NextFunction, query } from 'express';

import { ScheduleDTO } from '../../../dto/schedules/scheduleDTO';
import { CustomError } from '../../../utils/response/custom-error/CustomError';
import { ErrorValidation } from '../../../utils/response/custom-error/types';

const isValidLength = (length) => isNaN(length) === false && length >= 0 && length <= 24;
export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  const scheduleDTO: ScheduleDTO = req.body;
  const errorsValidation: ErrorValidation[] = [];
  if (scheduleDTO.length === undefined) {
    errorsValidation.push({ startDate: `missing request param length` });
  }
  if (isValidLength(scheduleDTO.length) === false) {
    errorsValidation.push({ length: `length must be a number between 0 and 24. '${scheduleDTO.length}' provided` });
  }
  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Edit schedule validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }
  return next();
};
