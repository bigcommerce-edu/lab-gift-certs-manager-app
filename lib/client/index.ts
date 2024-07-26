import { cache } from 'react';
import { Session } from '../session';
import db from '@/lib/db';

const { 
  API_TOKEN_MODE, 
  APP_CLIENT_ID, 
  STATIC_CLIENT_ID, 
  STATIC_V3_TOKEN, 
  STATIC_STORE_HASH, 
  BC_API_URL,
  NODE_ENV,
} = process.env;

type ApiEnv = {

};

export async function bcRest<ReqType> ({
  path,
  method,
  session,
  data,
  fetchOptions,
}: {
  path: string,
  method: string,
  session: Session | null,
  data?: ReqType,
  fetchOptions?: { cache?: RequestCache, next?: { revalidate: number } },
}) {
  return Promise.resolve({});
};

const getApiEnv = cache(async (session: Session | null): Promise<ApiEnv> => {
  return {};
});
