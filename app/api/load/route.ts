import { NextRequest, NextResponse } from "next/server";
import { appVerify } from "@/lib/auth";
import { getUrl } from "@/lib/session";

const { APP_ORIGIN } = process.env;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  try {
    const result = await appVerify(searchParams);
    const storeHash = result.sub.split('/')[1] || result.sub;

    const redirectUrl = getUrl(APP_ORIGIN ?? '', {
      storeHash,
    });

    return NextResponse.redirect(redirectUrl, { 
      status: 302,
      statusText: 'Found',
    });
  } catch (e) {
    const message = (e instanceof Error) ? e.message : e;
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
};