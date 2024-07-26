'use server';

import { bcRest } from "@/lib/client";
import { GiftCertSchema, GiftCert } from "@/types/gift-certs";
import { CustomersSchema } from "@/types/customer";
import { escape } from "querystring";
import { decodeSession, Session } from "@/lib/session";

type CustomerStoreCreditUpdateData = {
  id: number
  store_credit_amounts: {
    amount: number
  }[]
}[];

type GiftCartBalanceUpdateData = {
  balance: number
};

export const applyGiftCertificate = async (
  giftCertId: number, 
  customerId: number, 
  sessionToken: string | null
) => {
  const session = (sessionToken !== null) ? decodeSession(sessionToken) : null;

  const [giftCert, customer] = await Promise.all([
    getGiftCert(giftCertId, session),
    getCustomer(customerId, session),
  ]);

  if (giftCert === null || customer === null || parseFloat(giftCert.balance) <= 0) {
    throw new Error('Gift certificate or customer was not found');
  }

  const customerStoreCreditAmounts = customer.store_credit_amounts ?? [];
  customerStoreCreditAmounts.push({ amount: parseFloat(giftCert.balance) });

  await Promise.all([
    bcRest<CustomerStoreCreditUpdateData>({
      path: '/v3/customers',
      method: 'PUT',
      session,
      fetchOptions: { cache: 'no-store' },
      data: [{
        id: customerId,
        store_credit_amounts: customerStoreCreditAmounts,
      }],
    }),
    bcRest<GiftCartBalanceUpdateData>({
      path: `/v2/gift_certificates/${giftCertId}`,
      method: 'PUT',
      session,
      fetchOptions: { cache: 'no-store' },
      data: {
        balance: 0,
      },
    }),
  ]);
};

const getGiftCert = async (giftCertId: number, session: Session | null) => {
  const giftCertResult = await bcRest({
    path: `/v2/gift_certificates/${giftCertId}`,
    method: 'GET',
    session,
    fetchOptions: { cache: 'no-store' },
  });

  try {
    return GiftCertSchema.parse(giftCertResult);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getCustomer = async (customerId: number, session: Session | null) => {
  const customersResult = await bcRest({
    path: '/v3/customers?include=storecredit&id:in=' + escape(customerId.toString()),
    method: 'GET',
    session,
    fetchOptions: { cache: 'no-store' },
  });
  
  try {
    const { data } = CustomersSchema.parse(customersResult);
    return data.length > 0 ? data[0] : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
