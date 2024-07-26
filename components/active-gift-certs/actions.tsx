'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GiftCert } from "@/types/gift-certs";
import { Customer } from "@/types/customer";
import { lookUpCustomers } from "./actions/look-up-customer";
import { applyGiftCertificate } from "./actions/apply-gift-cert";
import styled from 'styled-components';

const ActiveGiftCertActions = ({
  giftCert
}: {
  giftCert: GiftCert
}) => {
  return (
    <>
    </>
  );
};

export default ActiveGiftCertActions;
