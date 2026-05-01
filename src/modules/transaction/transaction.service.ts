import * as transactionRepository from './transaction.repository';
import { generateInvoiceNumber } from '../../shared/invoice.helper';
import { TopupDto } from './transaction.schema';

export const getBalance = async (email: string) => {
  const data = await transactionRepository.getBalanceByEmail(email);
  if (!data) {
    throw { statusCode: 401, appStatus: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
  }
  return { balance: Number(data.balance) };
};

export const topup = async (email: string, dto: TopupDto) => {
  const invoiceNumber = generateInvoiceNumber();
  const result = await transactionRepository.topupBalance(email, dto.top_up_amount, invoiceNumber);
  return { balance: Number(result.balance) };
};
