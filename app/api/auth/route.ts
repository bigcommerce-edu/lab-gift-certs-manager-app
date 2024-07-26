import { NextRequest, NextResponse } from "next/server";
import { appAuth } from "@/lib/auth";
import { getUrl } from "@/lib/session";
import db from '@/lib/db';

const { APP_ORIGIN } = process.env;

export const GET = async (request: NextRequest) => {
  return NextResponse.json({}, { status: 200 });
};
