import { describe, expect, it } from 'vitest';
import { colors, contrastRatio, toCss, type ColorToken } from './index.js';

const textPairs: Array<[ColorToken, ColorToken, number]> = [
  ['textPrimary', 'background', 4.5], ['textPrimary', 'surface', 4.5], ['textPrimary', 'surfaceElevated', 4.5],
  ['textSecondary', 'surface', 4.5], ['textMuted', 'background', 4.5], ['textMuted', 'surface', 4.5], ['textMuted', 'surfaceElevated', 4.5],
  ['primaryForeground', 'primary', 4.5], ['primaryForeground', 'primaryHover', 4.5], ['primary', 'surface', 4.5], ['primary', 'background', 4.5],
  ['primarySoftForeground', 'primarySoft', 4.5], ['secondary', 'surface', 4.5],
  ['accent', 'surface', 4.5], ['accent', 'accentSoft', 4.5],
  ['success', 'successSoft', 4.5], ['success', 'surface', 4.5], ['warning', 'warningSoft', 4.5], ['warning', 'surface', 4.5],
  ['error', 'errorSoft', 4.5], ['error', 'surface', 4.5], ['info', 'infoSoft', 4.5], ['info', 'surface', 4.5],
  // Non-text: control edges and the focus ring need 3:1.
  ['borderStrong', 'surface', 3], ['primary', 'surface', 3],
];

describe.each(['light', 'dark'] as const)('%s palette', (scheme) => {
  it.each(textPairs)('%s on %s is at least %d:1', (fg, bg, min) => {
    expect(contrastRatio(colors[scheme][fg], colors[scheme][bg])).toBeGreaterThanOrEqual(min);
  });
});

describe('palettes', () => {
  it('define the same tokens in both schemes', () => {
    expect(Object.keys(colors.dark).sort()).toEqual(Object.keys(colors.light).sort());
  });
});

describe('toCss', () => {
  const css = toCss();
  it('emits light defaults, OS-driven dark and a forced dark override', () => {
    expect(css).toContain('--color-background: #F5F7F9;');
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain(':root:not([data-theme="light"])');
    expect(css).toContain(':root[data-theme="dark"]');
  });
  it('emits the documented scale names', () => {
    for (const name of ['--space-4: 16px', '--radius-md: 10px', '--color-text-primary', '--color-primary-hover', '--shadow-overlay']) expect(css).toContain(name);
  });
});
