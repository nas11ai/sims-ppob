import { z } from 'zod';

export const topupSchema = z.object({
  top_up_amount: z
    .number({ message: 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0' })
    .gt(0, 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'),
});

export type TopupDto = z.infer<typeof topupSchema>;
