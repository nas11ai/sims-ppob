import { Router } from 'express';
import * as membershipController from './membership.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { upload } from '../../middleware/upload.middleware';
import { registerSchema, loginSchema, updateProfileSchema } from './membership.schema';

const router = Router();

router.post('/registration', validate(registerSchema), membershipController.register);
router.post('/login', validate(loginSchema), membershipController.login);

router.get('/profile', authenticate, membershipController.getProfile);
router.put(
  '/profile/update',
  authenticate,
  validate(updateProfileSchema),
  membershipController.updateProfile,
);
router.put(
  '/profile/image',
  authenticate,
  upload.single('file'),
  membershipController.updateProfileImage,
);

export default router;
