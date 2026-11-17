/**
 * Domain types derived from the OpenAPI contract, so apps never re-declare them.
 */
import type { components } from '@mediconnect/api-client';

type Schemas = components['schemas'];

export type Sex = Schemas['Sex'];
export type OtpPurpose = Schemas['OtpPurpose'];

export type LoginRequest = Schemas['LoginRequest'];
export type RegisterRequest = Schemas['RegisterRequest'];
