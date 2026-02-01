import z from 'zod';

export const userCreateSchema = z.object({
  email: z.email('invalid email format.'),
  password: z.string().min(8, 'password must be at least 8 characters long.'),
  name: z.string().min(2, 'name must be at least 2 characters long.'),
});

export const userUpdateSchema = z.object({
  email: z.string().email('invalid email format.').optional(),
  name: z.string().min(2, 'name must be at least 2 characters long.').optional(),
  password: z.string().min(8, 'password must be at least 8 characters long.').optional(),
});