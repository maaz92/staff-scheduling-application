import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import {Schedule} from "../../orm/entities/schedules/Schedule";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { length } = req.body;

  const scheduleRepository = getRepository(Schedule);
  try {
    const schedule = await scheduleRepository.findOne({ where: { id } });

    if (!schedule) {
      const customError = new CustomError(404, 'General', `Schedule with id:${id} not found.`, ['Schedule not found.']);
      return next(customError);
    }

    schedule.length = length;

    try {
      await scheduleRepository.save(schedule);
      res.customSuccess(200, 'Schedule successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Schedule can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
