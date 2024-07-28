import { NextRequest, NextResponse } from "next/server";
import { appVerify } from "@/lib/auth";
import { deleteStore } from "@/lib/db/firebase";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  try {
    const result = await appVerify(searchParams);
    const storeHash = result.sub.split('/')[1] || result.sub;

    await deleteStore(storeHash);

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    const message = (e instanceof Error) ? e.message : e;
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
};