import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import {Schedule} from "../../orm/entities/schedules/Schedule";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { date, email, length } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      const customError = new CustomError(404, 'Validation', 'User does not exist', [
        `User with Email '${user.email}' does not exist`,
      ]);
      return next(customError);
    }

    try {
      const scheduleRepository = getRepository(Schedule);
      const schedule = new Schedule();
      schedule.date = date;
      schedule.staff = user;
      schedule.length = length;
      await scheduleRepository.save(schedule);

      res.customSuccess(200, 'Schedule successfully created.');
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `Schedule can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
