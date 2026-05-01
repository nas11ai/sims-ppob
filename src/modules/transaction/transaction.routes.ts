import { Router } from 'express';
import * as transactionController from './transaction.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { topupSchema } from './transaction.schema';
import { transactionSchema } from './transaction.schema';

const router = Router();

router.get('/balance', authenticate, transactionController.getBalance);
router.post('/topup', authenticate, validate(topupSchema), transactionController.topup);
router.post(
  '/transaction',
  authenticate,
  validate(transactionSchema),
  transactionController.transaction,
);
router.get('/transaction/history', authenticate, transactionController.getTransactionHistory);

export default router;
