import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import {Schedule} from "../../orm/entities/schedules/Schedule";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const scheduleRepository = getRepository(Schedule);
  try {
    const schedules = await scheduleRepository.find({
        select: ['id', 'staffId', 'date', 'length', 'created_at', 'updated_at'],
    });
    res.customSuccess(200, 'List of schedules.', schedules);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of schedules.`, null, err);
    return next(customError);
  }
};
