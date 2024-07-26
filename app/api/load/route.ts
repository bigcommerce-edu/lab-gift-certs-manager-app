import { NextRequest, NextResponse } from "next/server";
import { appVerify } from "@/lib/auth";
import { getUrl } from "@/lib/session";

const { APP_ORIGIN } = process.env;

export const GET = async (request: NextRequest) => {
  return NextResponse.json({}, { status: 200 });
};