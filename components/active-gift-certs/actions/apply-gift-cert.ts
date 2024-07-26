'use server';

import { bcRest } from "@/lib/client";
import { GiftCertSchema, GiftCert } from "@/types/gift-certs";
import { CustomersSchema } from "@/types/customer";
import { escape } from "querystring";
import { decodeSession, Session } from "@/lib/session";

export const applyGiftCertificate = async (
  giftCertId: number, 
  customerId: number, 
  sessionToken: string | null
) => {
  return Promise.resolve();
};

const getGiftCert = async (giftCertId: number, session: Session | null) => {
  return null;
};

const getCustomer = async (customerId: number, session: Session | null) => {
  return null;
};
