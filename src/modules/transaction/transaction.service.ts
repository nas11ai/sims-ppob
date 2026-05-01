import * as transactionRepository from './transaction.repository';
import { generateInvoiceNumber } from '../../shared/invoice.helper';
import { TopupDto, TransactionDto } from './transaction.schema';

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

export const transaction = async (email: string, dto: TransactionDto) => {
  const service = await transactionRepository.findServiceByCode(dto.service_code);
  if (!service) {
    throw { statusCode: 400, appStatus: 102, message: 'Service ataus Layanan tidak ditemukan' };
  }

  const invoiceNumber = generateInvoiceNumber();
  const result = await transactionRepository.createTransaction(
    email,
    service.id,
    service.service_name,
    invoiceNumber,
    Number(service.service_tariff),
  );

  return {
    invoice_number: result.invoice_number,
    service_code: service.service_code,
    service_name: service.service_name,
    transaction_type: result.transaction_type,
    total_amount: Number(service.service_tariff),
    created_on: result.created_on,
  };
};

export const getTransactionHistory = async (
  email: string,
  offset: number,
  limit: number | null,
) => {
  const records = await transactionRepository.getTransactionHistory(email, offset, limit);
  return {
    offset,
    limit,
    records,
  };
};
