/**
 * MediConnect design tokens: the single source of truth (docs/design-system.md, sections 4-9).
 *
 * Platform-neutral data only. Each platform adapts it:
 *   - web and admin: dist/tokens.css (generated from this file by scripts/build-css.mjs)
 *   - mobile: `colors[scheme]`, `space`, `radius`, `typography`, ... used inside StyleSheet factories
 *
 * Change a value here, rebuild, and re-run the contrast tests. Never hard-code a value in an app.
 */

export const colorSchemes = ['light', 'dark'] as const;
export type ColorScheme = (typeof colorSchemes)[number];

const light = {
  background: '#F5F7F9',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#D9E1E7',
  borderStrong: '#8695A1',
  textPrimary: '#12212E',
  textSecondary: '#3F4E5B',
  textMuted: '#51606D',
  primary: '#0B6E6E',
  primaryHover: '#095A5A',
  primaryForeground: '#FFFFFF',
  primarySoft: '#E3F2F1',
  primarySoftForeground: '#075555',
  secondary: '#2F4858',
  accent: '#9E4A14',
  accentSoft: '#FCEBDD',
  success: '#1F6B3A',
  successSoft: '#E7F5EC',
  warning: '#7A5B00',
  warningSoft: '#FFF6D6',
  error: '#A4262C',
  errorSoft: '#FBEAEA',
  info: '#1D5A96',
  infoSoft: '#E6F0FA',
} as const;

export type ColorToken = keyof typeof light;

const dark: Record<ColorToken, string> = {
  background: '#0C151C',
  surface: '#14212B',
  surfaceElevated: '#1B2B37',
  border: '#2A3B48',
  borderStrong: '#6F8494',
  textPrimary: '#EAF1F6',
  textSecondary: '#C3CFD8',
  textMuted: '#9FB0BD',
  primary: '#4DB6B0',
  primaryHover: '#6CC7C1',
  primaryForeground: '#06201F',
  primarySoft: '#12302F',
  primarySoftForeground: '#8FD8D3',
  secondary: '#A9BCC9',
  accent: '#F0A06A',
  accentSoft: '#3A2414',
  success: '#6FCB8E',
  successSoft: '#12301D',
  warning: '#E8C25A',
  warningSoft: '#33290A',
  error: '#F08A8F',
  errorSoft: '#3A1618',
  info: '#7DB4EA',
  infoSoft: '#122A42',
};

export const colors: Record<ColorScheme, Record<ColorToken, string>> = { light, dark };

/** 4-point scale. Keys are the step names used in the docs (`space-4` = 16). */
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48, 16: 64 } as const;

export const radius = { sm: 6, md: 10, lg: 16, full: 9999 } as const;

/**
 * The design system defines exactly one shadow: the overlay shadow (dialogs, menus, popovers).
 * Everything else is flat and separated by a 1px border. In dark mode overlays use `surfaceElevated`
 * instead of a shadow.
 */
export const shadow = {
  overlay: {
    light: { x: 0, y: 8, blur: 24, color: 'rgba(18, 33, 46, 0.12)' },
    dark: null,
  },
} as const;

export const fontFamily = {
  web: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
} as const;

/** Sizes and line heights are in px (dp on mobile). `letterSpacing` is in em. */
export const typography = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: 700, letterSpacing: -0.01 },
  title: { fontSize: 26, lineHeight: 32, fontWeight: 700, letterSpacing: -0.01 },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: 600, letterSpacing: 0 },
  subheading: { fontSize: 17, lineHeight: 24, fontWeight: 600, letterSpacing: 0 },
  body: { fontSize: 16, lineHeight: 22, fontWeight: 400, letterSpacing: 0 },
  label: { fontSize: 15, lineHeight: 20, fontWeight: 600, letterSpacing: 0 },
  small: { fontSize: 13, lineHeight: 18, fontWeight: 400, letterSpacing: 0 },
} as const;

export type TypographyToken = keyof typeof typography;

/** Minimum viewport widths in px. CSS custom properties cannot be used in media queries, so web code
 *  repeats these numbers in `@media (min-width: …)`; the generated CSS lists them as comments. */
export const breakpoints = { sm: 0, md: 600, lg: 1024, xl: 1440 } as const;

export const motion = {
  duration: { fast: 120, base: 200, navigation: 250, skeleton: 1500 },
  easing: { standard: 'cubic-bezier(0, 0, 0.2, 1)' },
} as const;

/** Proposed (not in the documented design system): needed once overlays and sticky bars exist. */
export const zIndex = { base: 0, sticky: 100, dropdown: 200, overlay: 300, dialog: 400, toast: 500 } as const;

/** Shared dimensions. Component-specific values stay here only when several components need them. */
export const size = {
  /** Minimum interactive hit area (px). */
  touchTarget: 44,
  /** Height of buttons, inputs and selects; also table rows. */
  control: 48,
  /** Maximum width of public page content (64rem). */
  contentMax: 1024,
  /** Maximum width of a single-column form or mobile screen body. */
  formMax: 560,
  /** Border width of cards, inputs and dividers. */
  hairline: 1,
  /** Focus ring. */
  focusRingWidth: 2,
  focusRingOffset: 2,
} as const;
