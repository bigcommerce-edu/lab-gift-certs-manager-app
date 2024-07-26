import * as jwt from 'jsonwebtoken';

const { APP_ORIGIN, JWT_SECRET } = process.env;

export type Session = {
  storeHash: string
};

type QueryParams = Record<string, string | string[] | undefined>;

export function encodeSession(session: Session) {
  return '';
};

export function decodeSession(session: string | QueryParams | URLSearchParams) {
  return null;
}

export function getSessionTokenFromQueryParams(query: QueryParams | URLSearchParams) {
  return null;
}

export function getUrl(url: string, session: Session | string) {
  return '';
}
