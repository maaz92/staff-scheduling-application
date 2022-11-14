import { Router } from 'express';

import { create, list, destroy, edit } from 'controllers/schedules';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

import { validatorCreate } from '../../middleware/validation/schedules';
import {validatorEdit} from "../../middleware/validation/schedules/validatorEdit";

const router = Router();

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR']), validatorCreate], create);
router.get('/', [checkJwt, checkRole(['ADMINISTRATOR', 'STANDARD'])], list);
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], destroy);
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR']), validatorEdit], edit);

export default router;
