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
  clientId: string
  accessToken: string
  storeHash: string
  responseType: string
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
  const env = await getApiEnv(session);
  
  return await fetch(
    `${BC_API_URL}/stores/${env.storeHash}${path}`,
    {
      ...fetchOptions,
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': env.accessToken,
      },
      ...(data && { body: JSON.stringify(data) })
    }
  ).then(res => res.json());

};

const getApiEnv = cache(async (session: Session | null): Promise<ApiEnv> => {
  const env = {
    responseType: "json",
  };

  if (NODE_ENV !== 'production' && API_TOKEN_MODE === "static") {
    console.log({
      tokenType: 'static',
      storeHash: STATIC_STORE_HASH,
      clientId: STATIC_CLIENT_ID,
    });
    return {
      ...env,
      clientId: STATIC_CLIENT_ID ?? '',
      accessToken: STATIC_V3_TOKEN ?? '',
      storeHash: STATIC_STORE_HASH ?? '',
    };
  } else if (session === null) {
    throw new Error('Cannot retrieve API token without a session');
  }

  throw new Error('Session-based environment not implemented yet');
});
