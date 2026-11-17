/**
 * Typed client for the MediConnect API (/api/v1). Types come from the backend's
 * OpenAPI contract (src/generated/schema.ts, never edited by hand).
 *
 * - Web apps: cookies (credentials: 'include'); no token is ever stored in JS.
 * - Native apps: pass getAccessToken; tokens live in secure storage, not here.
 */
import createClient, { type Client } from 'openapi-fetch';
import type { components, paths } from './generated/schema.js';

export type { components, paths };

/** Error envelope (api-specification.md §1.2). */
export interface ApiErrorBody {
  success: false;
  message: string;
  errors: Record<string, string[]>;
  code: string;
  request_id: string | null;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly errors: Record<string, string[]>;
  readonly requestId: string | null;

  constructor(status: number, body: Partial<ApiErrorBody> | undefined) {
    super(body?.message ?? `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.code = body?.code ?? 'UNKNOWN';
    this.errors = body?.errors ?? {};
    this.requestId = body?.request_id ?? null;
  }
}

export interface ApiClientOptions {
  /** e.g. "https://api.mediconnect.ph/api/v1" */
  baseUrl: string;
  /** Native clients: returns the current access token (or null when signed out). */
  getAccessToken?: () => string | null | Promise<string | null>;
  /** Web clients keep the default "include" so the Sanctum session cookie is sent. */
  credentials?: RequestCredentials;
  fetch?: typeof globalThis.fetch;
  /**
   * Web (cookie) clients: send Laravel's X-XSRF-TOKEN header, read from the
   * XSRF-TOKEN cookie, on every state-changing request. Call ensureCsrfCookie()
   * once before the first one (e.g. before login).
   */
  csrf?: boolean;
}

const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

/**
 * Fetches Sanctum's CSRF cookie for cookie (web) clients. baseUrl is the API
 * base ("https://api.example/api/v1"); the cookie endpoint lives at the origin.
 */
export async function ensureCsrfCookie(baseUrl: string, fetchImpl: typeof globalThis.fetch = globalThis.fetch): Promise<void> {
  const response = await fetchImpl(new URL('/sanctum/csrf-cookie', baseUrl).toString(), { credentials: 'include' });
  if (!response.ok) {
    throw new ApiError(response.status, { message: 'Could not start a secure session.' });
  }
}

export type ApiClient = Client<paths>;

export function createApiClient(options: ApiClientOptions): ApiClient {
  const client = createClient<paths>({
    baseUrl: options.baseUrl,
    credentials: options.credentials ?? 'include',
    headers: { Accept: 'application/json' },
    ...(options.fetch ? { fetch: options.fetch } : {}),
  });

  const { getAccessToken, csrf } = options;

  if (csrf) {
    client.use({
      onRequest({ request }) {
        const token = UNSAFE_METHODS.has(request.method) ? readCookie('XSRF-TOKEN') : null;
        if (token) {
          request.headers.set('X-XSRF-TOKEN', token);
        }
        return request;
      },
    });
  }

  if (getAccessToken) {
    client.use({
      async onRequest({ request }) {
        const token = await getAccessToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
        return request;
      },
    });
  }

  return client;
}

/**
 * A new Idempotency-Key for a critical write. Create one per user action and
 * reuse it for every retry of that same action (api-specification.md §1.4).
 */
export function newIdempotencyKey(): string {
  return globalThis.crypto.randomUUID();
}

/**
 * Returns the envelope's `data` on success, throws ApiError otherwise.
 */
export function unwrap<T>(result: { data?: { data?: T } | undefined; error?: unknown; response: Response }): T {
  if (result.error !== undefined || !result.response.ok) {
    throw new ApiError(result.response.status, result.error as Partial<ApiErrorBody> | undefined);
  }

  return result.data?.data as T;
}
