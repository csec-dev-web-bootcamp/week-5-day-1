import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
});
