import * as jwt from 'jsonwebtoken';

const { APP_ORIGIN, JWT_SECRET } = process.env;

export type Session = {
  storeHash: string
};

type QueryParams = Record<string, string | string[] | undefined>;

export function encodeSession(session: Session) {
  return jwt.sign(session, JWT_SECRET ?? '');
};

export function decodeSession(session: string | QueryParams | URLSearchParams) {
  const sessionToken = (typeof session === "string") ? session : getSessionTokenFromQueryParams(session);
  if (sessionToken === null) {
    return null;
  }

  try {
    return jwt.verify(sessionToken, JWT_SECRET ?? '') as Session;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function getSessionTokenFromQueryParams(query: QueryParams | URLSearchParams) {
  if (query instanceof URLSearchParams) {
    return query.get('session') ?? '';
  }

  return (!query.session) ? null : (
    Array.isArray(query.session) ? query.session[0] ?? '' : query.session
  );
}

export function getUrl(url: string, session: Session | string) {
  const sessionToken = (typeof session === "string") ? session : encodeSession(session);

  if (!sessionToken) return url;

  const delimiter = new URL(url, APP_ORIGIN).search ? '&' : '?';

  return `${url}${delimiter}session=${sessionToken}`;
}
