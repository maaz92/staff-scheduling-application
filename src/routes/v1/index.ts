import { Router } from 'express';

import auth from './auth';
import users from './users';
import schedules from './schedules';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/schedules', schedules);
export default router;
