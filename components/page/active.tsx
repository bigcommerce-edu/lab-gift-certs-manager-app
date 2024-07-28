'use client';

import ActiveGiftCertActions from "../active-gift-certs/actions";
import { GiftCerts, GiftCert } from "@/types/gift-certs";
import { Panel, Table } from "@bigcommerce/big-design";

const Active = ({ 
  giftCerts 
}: {
  giftCerts: GiftCerts
}) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const columns=[
    {
      header: 'Code',
      hash: 'code',
      render: ({ code }: GiftCert) => code,
    },
    {
      header: 'Sender',
      hash: 'sender',
      render: ({ from_name, from_email }: GiftCert) => `${from_name} (${from_email})`,
    },
    {
      header: 'Recipient',
      hash: 'recipient',
      render: ({ to_name, to_email }: GiftCert) => `${to_name} (${to_email})`,
    },
    {
      header: 'Balance',
      hash: 'balance',
      render: ({ balance }: GiftCert) => currencyFormatter.format(parseFloat(balance)),
    },
    {
      header: '',
      hash: 'actions',
      render: (giftCert: GiftCert) => <ActiveGiftCertActions giftCert={giftCert} />,
    },
  ];

  return (
    <Panel header="Active Gift Certificates">
      <Table
        columns={columns}
        items={giftCerts}
      />
    </Panel>
  );
};

export default Active;
