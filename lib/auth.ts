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
  return {
    access_token: '',
    scope: '',
    user: {
      id: 0,
      username: '',
      email: '',
    },
    context: '',
    account_uuid: '',
  };
}

export async function appVerify(query: URLSearchParams) {
  return { sub: '' };
}
