import { Router } from 'express';
import * as informationController from './information.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/banner', informationController.getBanners);
router.get('/services', authenticate, informationController.getServices);

export default router;
