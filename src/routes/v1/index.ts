import { Router } from 'express';

import auth from './auth';
import schedules from './schedules';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/schedules', schedules);
export default router;
