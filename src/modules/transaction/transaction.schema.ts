import { z } from 'zod';

export const topupSchema = z.object({
  top_up_amount: z
    .number({ message: 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0' })
    .gt(0, 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'),
});

export const transactionSchema = z.object({
  service_code: z.string().min(1, 'Service code harus diisi'),
});

export type TopupDto = z.infer<typeof topupSchema>;
export type TransactionDto = z.infer<typeof transactionSchema>;
