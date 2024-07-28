'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GiftCert } from "@/types/gift-certs";
import { Customer } from "@/types/customer";
import { lookUpCustomers } from "./actions/look-up-customer";
import { applyGiftCertificate } from "./actions/apply-gift-cert";
import { AlertProps, Box, Button, Select } from "@bigcommerce/big-design";
import { alertsManager } from "@/app/theme-provider";

const ActiveGiftCertActions = ({
  giftCert
}: {
  giftCert: GiftCert
}) => {
  const [pending, setPending] = useState(false);
  const [matchingCustomers, setMatchingCustomers] = useState<Customer[] | null>(null);
  const [customerId, setCustomerId] = useState(0);
  const [applied, setApplied] = useState(false);

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

    try {
      await applyGiftCertificate(giftCert.id, customerId, sessionToken);
      setApplied(true);
    } catch (e) {
      const message = (e instanceof Error) ? e.message : e as string;
      const error: AlertProps = {
        header: 'Error',
        messages: [{ text: message }],
        type: 'error',
      };
      alertsManager.add(error);
    }

    setPending(false);
  };

  return (
    <>
      {applied && (
        <Box backgroundColor="secondary20" 
          padding="large">      
          Applied
        </Box>
      )}

      {!applied && matchingCustomers === null && (
        <Button
          isLoading={pending}
          onClick={customerLookup}
          variant="secondary"
        >
          Apply
        </Button>
      )}

      {!applied && matchingCustomers !== null && matchingCustomers.length > 0 && (
        <>
          <Box marginBottom="large">
            <Select
                label="Matching Customers"
                onOptionChange={(val: number) => setCustomerId(val)}
                options={matchingCustomers.map(customer => {
                  return { 
                    value: customer.id, 
                    content: `${customer.email} (Channel ${customer.origin_channel_id})`
                  };
                })}
                required
                value={customerId}
              />
          </Box>
          <Button
            isLoading={pending}
            onClick={handleApplyGiftCertificate}
            variant="primary"
          >
            Apply to Customer
          </Button>
        </>
      )}

      {!applied && matchingCustomers !== null && matchingCustomers.length <= 0 && (
        <Box backgroundColor="secondary20" 
          padding="large">
            No registered customers with recipient email address
        </Box>
      )}
    </>
  );
};

export default ActiveGiftCertActions;
