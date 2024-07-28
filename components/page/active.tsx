'use client';

import ActiveGiftCertActions from "../active-gift-certs/actions";
import { GiftCerts, GiftCert } from "@/types/gift-certs";
import styled from 'styled-components';

const cellStyles = `
  border: 1px solid rgb(var(--foreground-rgb));
  padding: 20px;
`;

const ActiveCertsTable = styled.table`
  border-collapse: collapse;
  margin: 20px;
`;

const TableHeader = styled.th`${cellStyles}`;
const TableCell = styled.td`${cellStyles}`;

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
    <ActiveCertsTable>
      <thead>
        <tr>
          {columns.map(column => (
            <TableHeader key={column.hash}>
              {column.header}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {giftCerts.map(giftCert => (
          <tr key={giftCert.id}>
            {columns.map(column => (
              <TableCell key={column.hash}>
                {column.render(giftCert)}
              </TableCell>
            ))}
          </tr>
        ))}
      </tbody>
    </ActiveCertsTable>
  );
};

export default Active;
