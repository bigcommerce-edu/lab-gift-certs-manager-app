import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.number(),
  email: z.string(),
  origin_channel_id: z.number(),
  store_credit_amounts: z.array(z.object({
    amount: z.number(),
  })).optional(),
});

export const CustomersSchema = z.object({
  data: z.array(CustomerSchema),
});

export type Customer = z.infer<typeof CustomerSchema>;
export type Customers = z.infer<typeof CustomersSchema>;
