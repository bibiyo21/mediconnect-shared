// Generates packages/api-client/src/generated/schema.ts from the backend's
// OpenAPI contract (mediconnect-backend/openapi/openapi.json).
//
// Source: BACKEND_OPENAPI (a path), defaulting to the sibling checkout
// ../backend. CI will pin this to a tagged backend release (architecture.md §5).
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = resolve(process.env.BACKEND_OPENAPI ?? '../backend/openapi/openapi.json');
const target = resolve('packages/api-client/src/generated/schema.ts');

if (!existsSync(source)) {
  console.error(`OpenAPI contract not found at ${source}. Set BACKEND_OPENAPI or check out mediconnect-backend next to this repo.`);
  process.exit(1);
}

const version = JSON.parse(readFileSync(source, 'utf8')).info?.version ?? 'unknown';

execFileSync('pnpm', ['exec', 'openapi-typescript', source, '-o', target], { stdio: 'inherit' });

const header = `// GENERATED from the mediconnect-backend OpenAPI contract (API ${version}). Do not edit: run \`pnpm generate\`.\n`;
writeFileSync(target, header + readFileSync(target, 'utf8'));
console.log(`Generated ${target} from API ${version}`);
