import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().min(1, 'Email harus diisi').email('Paramter email tidak sesuai format'),
  first_name: z.string().min(1, 'First name harus diisi'),
  last_name: z.string().min(1, 'Last name harus diisi'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Email harus diisi').email('Paramter email tidak sesuai format'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
