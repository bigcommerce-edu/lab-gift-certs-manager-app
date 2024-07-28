import { bcRest } from "@/lib/client";
import { GiftCertsSchema } from "@/types/gift-certs";
import { decodeSession, Session } from "@/lib/session";
import Active from "@/components/page/active";

const getGiftCertificates = async (session: Session | null) => {
  try {
    const giftCertsResult = await bcRest({
      path: '/v2/gift_certificates',
      method: 'GET',
      session,
      fetchOptions: { next: { revalidate: 60 } },
    });
    return GiftCertsSchema.parse(giftCertsResult);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default async function ActivePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const session = (searchParams !== undefined) ? decodeSession(searchParams) : null;

  const giftCerts = (await getGiftCertificates(session))
    .filter(giftCert => (giftCert.status === 'active' || giftCert.status === 'pending') && parseInt(giftCert.balance) > 0);

  return (
    <main>
      <Active giftCerts={giftCerts} />
    </main>
  );
}
