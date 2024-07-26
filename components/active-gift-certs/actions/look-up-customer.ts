'use server';

import { bcRest } from "@/lib/client";
import { CustomersSchema, Customers } from "@/types/customer";
import { escape } from "querystring";
import { decodeSession } from "@/lib/session";

export const lookUpCustomers = async (
  email: string, 
  sessionToken: string | null
) => {
  return [];
};
