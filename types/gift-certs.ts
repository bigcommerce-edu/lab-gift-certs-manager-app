import { z } from "zod";

export const GiftCertSchema = z.object({
  id: z.number(),
  code: z.string(),
  to_name: z.string(),
  to_email: z.string(),
  from_name: z.string(),
  from_email: z.string(),
  amount: z.string(),
  balance: z.string(),
  status: z.string(),
});

export type GiftCert = z.infer<typeof GiftCertSchema>;

export const GiftCertsSchema = z.array(GiftCertSchema);

export type GiftCerts = z.infer<typeof GiftCertsSchema>;
