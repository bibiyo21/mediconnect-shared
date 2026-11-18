/**
 * Domain types derived from the OpenAPI contract, so apps never re-declare them.
 */
import type { components } from '@mediconnect/api-client';

type Schemas = components['schemas'];

export type Sex = Schemas['Sex'];
/** Purposes a client may request from POST /auth/otp (contact changes use POST /auth/contact/otp). */
export type OtpPurpose = Schemas['RequestOtpRequest']['purpose'];

export type LoginRequest = Schemas['LoginRequest'];
export type RegisterRequest = Schemas['RegisterRequest'];
