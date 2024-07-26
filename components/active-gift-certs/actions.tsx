'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GiftCert } from "@/types/gift-certs";
import { Customer } from "@/types/customer";
import { lookUpCustomers } from "./actions/look-up-customer";
import { applyGiftCertificate } from "./actions/apply-gift-cert";
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
`;

const ErrorMsg = styled.div`
  color: red;
`;

const ActiveGiftCertActions = ({
  giftCert
}: {
  giftCert: GiftCert
}) => {
  const [pending, setPending] = useState(false);
  const [matchingCustomers, setMatchingCustomers] = useState<Customer[] | null>(null);
  const [customerId, setCustomerId] = useState(0);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const searchParams = useSearchParams();
  const sessionToken = searchParams?.get('session') ?? null;

  const customerLookup = async () => {
    if (pending) return;

    setPending(true);

    const customers = await lookUpCustomers(giftCert.to_email, sessionToken);
    setMatchingCustomers(customers);

    setPending(false);
  };

  const handleApplyGiftCertificate = async () => {
    if (pending) return;
    if (customerId === 0) return;

    setPending(true);
    setError(null);

    try {
      await applyGiftCertificate(giftCert.id, customerId, sessionToken);
      setApplied(true);
    } catch (e) {
      const message = (e instanceof Error) ? e.message : e as string;
      setError(message);
    }

    setPending(false);
  };

  return (
    <>
      {error !== null && (
        <ErrorMsg>{error}</ErrorMsg>
      )}

      {applied && (
        <span>
          Applied
        </span>
      )}

      {!applied && matchingCustomers === null && (
        <Button 
          onClick={customerLookup}
        >
          {pending ? '...' : 'Apply'}
        </Button>
      )}

      {!applied && matchingCustomers !== null && matchingCustomers.length > 0 && (
        <>
          <div>
            <select
              onChange={(e) => setCustomerId(parseInt(e.target.value))}
              value={customerId}
            >
              <>
                <option value="0">--</option>
                {matchingCustomers.map(customer => (
                  <option key={customer.id}
                    value={customer.id}
                  > 
                    {customer.email} (Channel {customer.origin_channel_id}
                  </option>
                ))}
              </>
            </select>
          </div>
          <Button
            onClick={handleApplyGiftCertificate}
          >
            {pending ? '...' : 'Apply to Customer'}
          </Button>
        </>
      )}

      {!applied && matchingCustomers !== null && matchingCustomers.length <= 0 && (
          <span>
            No registered customers with recipient email address
          </span>
      )}
    </>
  );
};

export default ActiveGiftCertActions;
