import { URLSearchParams } from 'url';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';

const { 
  APP_CLIENT_ID, 
  APP_CLIENT_SECRET, 
  AUTH_CALLBACK,
  BC_LOGIN_URL,
} = process.env;

const AuthResultSchema = z.object({
  access_token: z.string(),
  scope: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
  }),
  context: z.string(),
  account_uuid: z.string(),
});

export type AuthResult = z.infer<typeof AuthResultSchema>;

const VerifyResultSchema = z.object({
  sub: z.string(),
});

export async function appAuth(query: URLSearchParams) {
  const oauthResponse = await fetch(
    `${BC_LOGIN_URL}/oauth2/token`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: APP_CLIENT_ID,
        client_secret: APP_CLIENT_SECRET,
        code: query.get('code'),
        context: query.get('context'),
        scope: query.get('scope'),
        grant_type: 'authorization_code',
        redirect_uri: AUTH_CALLBACK,
      }),
    }
  ).then(res => res.json());

  return AuthResultSchema.parse(oauthResponse);
}

export async function appVerify(query: URLSearchParams) {
  return { sub: '' };
}
