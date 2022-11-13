import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import * as ScheduleService from '../../services/schedules';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    await ScheduleService.destroy(id);
    res.customSuccess(200, 'Schedule successfully deleted.', { id });
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(500, 'Raw', 'Error', null, customError);
    }
    return next(customError);
  }
};
