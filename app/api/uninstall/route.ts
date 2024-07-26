import { NextRequest, NextResponse } from "next/server";
import { appVerify } from "@/lib/auth";
import { deleteStore } from "@/lib/db/firebase";

export const GET = async (request: NextRequest) => {
  return NextResponse.json({}, { status: 200 });
};