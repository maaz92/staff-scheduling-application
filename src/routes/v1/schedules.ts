import { Router } from 'express';

import { create, list, destroy, edit } from 'controllers/schedules';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

const router = Router();

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], create);
router.get('/', [checkJwt, checkRole(['ADMINISTRATOR', 'STANDARD'])], list);
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], destroy);
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], edit);

export default router;
