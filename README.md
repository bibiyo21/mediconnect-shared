# mediconnect-shared

Shared TypeScript packages for the MediConnect apps (`mediconnect-mobile`, `mediconnect-web`, `mediconnect-admin`), published as versioned `@mediconnect/*` packages.

| Package | Contents |
|---|---|
| `@mediconnect/api-client` | Typed API client. `src/generated/schema.ts` is generated from the backend OpenAPI contract; never edit it. |
| `@mediconnect/shared-types` | Domain types derived from the contract (`Sex`, `OtpPurpose`, request shapes). |
| `@mediconnect/configuration` | Shared `tsconfig` base. |
| `@mediconnect/validation`, `@mediconnect/design-system`, `@mediconnect/business-rules` | Skeletons, filled in with the app shells (Phase 1, increment 9). |

## Work on it

Needs Node 24+ and pnpm 12. Check out `mediconnect-backend` next to this repository (`../backend`), or set `BACKEND_OPENAPI` to the contract file.

```bash
pnpm install
pnpm generate          # regenerate the client from ../backend/openapi/openapi.json
pnpm build && pnpm typecheck && pnpm test
pnpm check:generated   # fails if the committed client is out of date
```

## Contract flow

The backend commits `openapi/openapi.json` (a backend test fails if it is stale). This repository regenerates the client from it and commits the result; `check:generated` keeps the two in step. Pinning to tagged backend releases and publishing to GitHub Packages are set up with CI. See `mediconnect-docs/docs/architecture.md` §5.

## Use from an app

```ts
import { createApiClient, newIdempotencyKey, unwrap } from '@mediconnect/api-client';

const api = createApiClient({ baseUrl: 'https://api.example/api/v1', getAccessToken: () => secureStore.accessToken });
const me = unwrap(await api.GET('/auth/me'));
```
