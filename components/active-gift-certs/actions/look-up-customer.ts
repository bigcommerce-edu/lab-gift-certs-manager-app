'use server';

import { bcRest } from "@/lib/client";
import { CustomersSchema, Customers } from "@/types/customer";
import { escape } from "querystring";
import { decodeSession } from "@/lib/session";

export const lookUpCustomers = async (
  email: string, 
  sessionToken: string | null
) => {
  const session = (sessionToken !== null) ? decodeSession(sessionToken) : null;

  try {
    const customersResult = await bcRest({
      path: '/v3/customers?email:in=' + escape(email),
      method: 'GET',
      session,
      fetchOptions: { next: { revalidate: 60 } },
    });

    const { data } = CustomersSchema.parse(customersResult);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
