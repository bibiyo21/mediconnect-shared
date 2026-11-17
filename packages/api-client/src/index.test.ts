import { describe, expect, it } from 'vitest';
import { ApiError, createApiClient, newIdempotencyKey, unwrap } from './index.js';

function fakeFetch(status: number, body: unknown, seen: Request[] = []): typeof fetch {
  return async (input) => {
    seen.push(input as Request);
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  };
}

describe('createApiClient', () => {
  it('sends the bearer token from getAccessToken and accepts JSON', async () => {
    const seen: Request[] = [];
    const client = createApiClient({ baseUrl: 'https://api.test/api/v1', getAccessToken: () => 'tok-1', fetch: fakeFetch(200, { success: true, data: {} }, seen) });

    await client.GET('/auth/me');

    expect(seen[0]?.headers.get('Authorization')).toBe('Bearer tok-1');
    expect(seen[0]?.headers.get('Accept')).toBe('application/json');
    expect(seen[0]?.url).toBe('https://api.test/api/v1/auth/me');
  });

  it('sends no Authorization header for cookie (web) clients', async () => {
    const seen: Request[] = [];
    const client = createApiClient({ baseUrl: 'https://api.test/api/v1', fetch: fakeFetch(200, { success: true, data: {} }, seen) });

    await client.GET('/health');

    expect(seen[0]?.headers.has('Authorization')).toBe(false);
    expect(seen[0]?.credentials).toBe('include');
  });
});

describe('unwrap', () => {
  it('returns the envelope data on success', async () => {
    const client = createApiClient({ baseUrl: 'https://api.test/api/v1', fetch: fakeFetch(200, { success: true, data: { status: 'ok' }, meta: {}, message: null }) });

    expect(unwrap(await client.GET('/health'))).toEqual({ status: 'ok' });
  });

  it('throws ApiError with the stable code, field errors and request id', async () => {
    const body = { success: false, message: 'Validation failed.', errors: { code: ['bad'] }, code: 'VALIDATION_FAILED', request_id: '01JXYZ' };
    const client = createApiClient({ baseUrl: 'https://api.test/api/v1', fetch: fakeFetch(422, body) });

    const result = await client.POST('/auth/otp/verify', { body: { challenge_id: 'x', code: '123456' } });

    expect(() => unwrap(result)).toThrow(ApiError);
    try {
      unwrap(result);
    } catch (e) {
      expect(e).toMatchObject({ status: 422, code: 'VALIDATION_FAILED', errors: { code: ['bad'] }, requestId: '01JXYZ' });
    }
  });
});

describe('newIdempotencyKey', () => {
  it('creates distinct UUIDs', () => {
    const a = newIdempotencyKey();
    expect(a).toMatch(/^[0-9a-f-]{36}$/);
    expect(newIdempotencyKey()).not.toBe(a);
  });
});
