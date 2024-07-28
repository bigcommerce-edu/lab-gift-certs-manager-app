import { NextRequest, NextResponse } from "next/server";
import { appAuth } from "@/lib/auth";
import { getUrl } from "@/lib/session";
import db from '@/lib/db';

const { APP_ORIGIN } = process.env;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  try {
    const authResult = await appAuth(searchParams);
    const storeHash = authResult.context.split('/')[1] || authResult.context;

    await Promise.all([
      db.setStore(authResult),
      db.setUser(authResult.user),
      db.setStoreUser(authResult),
    ]);

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
