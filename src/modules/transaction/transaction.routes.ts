import { Router } from 'express';
import * as transactionController from './transaction.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { topupSchema } from './transaction.schema';

const router = Router();

router.get('/balance', authenticate, transactionController.getBalance);
router.post('/topup', authenticate, validate(topupSchema), transactionController.topup);

export default router;
