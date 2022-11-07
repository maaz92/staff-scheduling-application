import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import {Schedule} from "../../orm/entities/schedules/Schedule";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const scheduleRepository = getRepository(Schedule);
  try {
    const schedule = await scheduleRepository.findOne({ where: { id } });

    if (!schedule) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Schedule with id:${id} doesn't exists.`]);
      return next(customError);
    }
    scheduleRepository.delete(id);

    res.customSuccess(200, 'Schedule successfully deleted.', { id: schedule.id});
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
