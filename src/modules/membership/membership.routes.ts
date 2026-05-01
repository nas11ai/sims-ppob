import { Router } from 'express';
import * as membershipController from './membership.controller';
import { validate } from '../../middleware/validate.middleware';
import { registerSchema, loginSchema } from './membership.schema';

const router = Router();

router.post('/registration', validate(registerSchema), membershipController.register);
router.post('/login', validate(loginSchema), membershipController.login);

export default router;
