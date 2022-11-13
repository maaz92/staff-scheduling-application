import * as ScheduleDAO from '../../dao/schedules/scheduleDAO';
import { Schedule } from '../../orm/entities/schedules/Schedule';

export const list = async (): Promise<Schedule[]> => {
  return await ScheduleDAO.list();
};
