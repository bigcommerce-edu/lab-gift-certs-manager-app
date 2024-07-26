import { bcRest } from "@/lib/client";
import { GiftCertsSchema } from "@/types/gift-certs";
import { decodeSession, Session } from "@/lib/session";
import Active from "@/components/page/active";

export default async function ActivePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  return (
    <main>
      <Active giftCerts={[]} />
    </main>
  );
}
