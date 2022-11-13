import { UserSortOrder } from './types';

export class UserQueryDTO {
  sortOrder: UserSortOrder;
  startDate: string;
  endDate: string;
}
