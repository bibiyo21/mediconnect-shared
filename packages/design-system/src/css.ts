import { breakpoints, colors, motion, radius, shadow, size, space, typography, zIndex, type ColorScheme } from './tokens.js';

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const px = (n: number) => `${n}px`;

/** Custom properties that differ between colour schemes. */
function schemeVariables(scheme: ColorScheme): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(colors[scheme])) vars[`--color-${kebab(name)}`] = value;
  const o = shadow.overlay[scheme];
  vars['--shadow-overlay'] = o ? `${px(o.x)} ${px(o.y)} ${px(o.blur)} ${o.color}` : 'none';
  vars['--color-focus-ring'] = colors[scheme].primary;
  return vars;
}

/** Custom properties shared by both colour schemes. */
function commonVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [k, v] of Object.entries(space)) vars[`--space-${k}`] = px(v);
  for (const [k, v] of Object.entries(radius)) vars[`--radius-${k}`] = px(v);
  for (const [k, t] of Object.entries(typography)) {
    vars[`--font-size-${k}`] = px(t.fontSize);
    vars[`--line-height-${k}`] = px(t.lineHeight);
    vars[`--font-weight-${k}`] = String(t.fontWeight);
    vars[`--letter-spacing-${k}`] = `${t.letterSpacing}em`;
  }
  for (const [k, v] of Object.entries(motion.duration)) vars[`--duration-${k}`] = `${v}ms`;
  vars['--ease-standard'] = motion.easing.standard;
  for (const [k, v] of Object.entries(zIndex)) vars[`--z-${k}`] = String(v);
  vars['--size-touch-target'] = px(size.touchTarget);
  vars['--size-control'] = px(size.control);
  vars['--size-content-max'] = px(size.contentMax);
  vars['--size-form-max'] = px(size.formMax);
  vars['--size-hairline'] = px(size.hairline);
  vars['--size-focus-ring-width'] = px(size.focusRingWidth);
  vars['--size-focus-ring-offset'] = px(size.focusRingOffset);
  return vars;
}

const block = (selector: string, vars: Record<string, string>, indent = '') =>
  `${indent}${selector} {\n${Object.entries(vars).map(([k, v]) => `${indent}  ${k}: ${v};`).join('\n')}\n${indent}}`;

export function toCssVariables(scheme: ColorScheme): Record<string, string> {
  return { ...schemeVariables(scheme), ...commonVariables() };
}

/**
 * The stylesheet for web and admin. Light by default; dark follows the OS setting unless the page opts
 * out with `data-theme="light"`; `data-theme="dark"` forces dark.
 */
export function toCss(): string {
  const bp = Object.entries(breakpoints).map(([k, v]) => `${k} ${v}px`).join(', ');
  return [
    '/* GENERATED from @mediconnect/design-system (src/tokens.ts). Do not edit: run `pnpm build` in mediconnect-shared. */',
    `/* Breakpoints (min-width), repeat in @media rules: ${bp} */`,
    block(':root', { 'color-scheme': 'light dark', ...toCssVariables('light') }),
    '@media (prefers-color-scheme: dark) {',
    block(':root:not([data-theme="light"])', schemeVariables('dark'), '  '),
    '}',
    block(':root[data-theme="dark"]', schemeVariables('dark')),
    '',
  ].join('\n');
}
