import { randomBytes } from 'crypto';

export const generateInvoiceNumber = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const random = randomBytes(3).toString('hex').toUpperCase(); // e.g. A3F9C1

  return `INV${year}${month}${day}-${random}`;
};
