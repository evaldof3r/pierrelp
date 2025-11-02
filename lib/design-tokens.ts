import designTokens from './design-tokens.json';

// Type definitions for design tokens
export type DesignTokens = typeof designTokens;

// Helper function to get token value
export function getToken(path: string): string {
  const keys = path.split('.');
  let value: any = designTokens;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      console.warn(`Design token not found: ${path}`);
      return '';
    }
  }
  
  return typeof value === 'object' && value !== null && 'value' in value
    ? value.value
    : String(value);
}

// Color tokens
export const colors = {
  primary: {
    background: getToken('colors.primary.background.value'),
    backgroundBase: getToken('colors.primary.background-base.value'),
    surface: getToken('colors.primary.surface.value'),
  },
  secondary: {
    accent: getToken('colors.secondary.accent.value'),
    accentHover: getToken('colors.secondary.accent-hover.value'),
  },
  neutral: {
    foreground: getToken('colors.neutral.foreground.value'),
    foregroundMuted: getToken('colors.neutral.foreground-muted.value'),
    foregroundInverted: getToken('colors.neutral.foreground-inverted.value'),
    foregroundDisabled: getToken('colors.neutral.foreground-disabled.value'),
    border: getToken('colors.neutral.border.value'),
  },
  accent: {
    greenPrimary: getToken('colors.accent.green-primary.value'),
    greenSecondary: getToken('colors.accent.green-secondary.value'),
    textLight: getToken('colors.accent.text-light.value'),
  },
} as const;

// Typography tokens
export const typography = {
  fontFamily: {
    primary: getToken('typography.fontFamily.primary.value'),
    sans: getToken('typography.fontFamily.sans.value'),
    mono: getToken('typography.fontFamily.mono.value'),
  },
  fontSize: {
    sm: getToken('typography.fontSize.text-sm.value'),
    base: getToken('typography.fontSize.text-base.value'),
    xl: getToken('typography.fontSize.text-xl.value'),
    '2xl': getToken('typography.fontSize.text-2xl.value'),
    '3xl': getToken('typography.fontSize.text-3xl.value'),
    '5xl': getToken('typography.fontSize.text-5xl.value'),
    heroLarge: getToken('typography.fontSize.hero-large.value'),
    heroExtraLarge: getToken('typography.fontSize.hero-extra-large.value'),
  },
  fontWeight: {
    normal: getToken('typography.fontWeight.normal.value'),
    medium: getToken('typography.fontWeight.font-medium.value'),
    bold: getToken('typography.fontWeight.font-bold.value'),
  },
  lineHeight: {
    '6': getToken('typography.lineHeight.leading-6.value'),
    '7': getToken('typography.lineHeight.leading-7.value'),
    '8': getToken('typography.lineHeight.leading-8.value'),
    none: getToken('typography.lineHeight.leading-none.value'),
    tight: getToken('typography.lineHeight.leading-tight.value'),
    normal: getToken('typography.lineHeight.leading-normal.value'),
    '100': getToken('typography.lineHeight.leading-100.value'),
  },
  letterSpacing: {
    tight: getToken('typography.letterSpacing.tight.value'),
    normal: getToken('typography.letterSpacing.normal.value'),
  },
} as const;

// Spacing tokens
export const spacing = {
  scale: {
    '0': getToken('spacing.scale.0.value'),
    '1': getToken('spacing.scale.1.value'),
    '2': getToken('spacing.scale.2.value'),
    '3': getToken('spacing.scale.3.value'),
    '4': getToken('spacing.scale.4.value'),
    '6': getToken('spacing.scale.6.value'),
    '8': getToken('spacing.scale.8.value'),
    '10': getToken('spacing.scale.10.value'),
    '11': getToken('spacing.scale.11.value'),
    '12': getToken('spacing.scale.12.value'),
    '16': getToken('spacing.scale.16.value'),
    '20': getToken('spacing.scale.20.value'),
    '24': getToken('spacing.scale.24.value'),
  },
  gap: {
    xs: getToken('spacing.gap.xs.value'),
    sm: getToken('spacing.gap.sm.value'),
    md: getToken('spacing.gap.md.value'),
    lg: getToken('spacing.gap.lg.value'),
    xl: getToken('spacing.gap.xl.value'),
    '2xl': getToken('spacing.gap.2xl.value'),
    '3xl': getToken('spacing.gap.3xl.value'),
    '4xl': getToken('spacing.gap.4xl.value'),
  },
  padding: {
    p4: getToken('spacing.padding.p-4.value'),
    p6: getToken('spacing.padding.p-6.value'),
    p11: getToken('spacing.padding.p-11.value'),
    p24: getToken('spacing.padding.p-24.value'),
  },
  margin: {
    sectionVertical: getToken('spacing.margin.section-vertical.value'),
    sectionHorizontal: getToken('spacing.margin.section-horizontal.value'),
  },
} as const;

// Border radius tokens
export const borderRadius = {
  none: getToken('borderRadius.none.value'),
  sm: getToken('borderRadius.sm.value'),
  md: getToken('borderRadius.md.value'),
  lg: getToken('borderRadius.lg.value'),
  xl: getToken('borderRadius.xl.value'),
  '2xl': getToken('borderRadius.2xl.value'),
  full: getToken('borderRadius.full.value'),
} as const;

// Shadow tokens
export const shadows = {
  none: getToken('shadows.none.value'),
  sm: getToken('shadows.sm.value'),
  glassmorphism: {
    backdropBlur: getToken('effects.backdropBlur.value'),
    opacity: getToken('effects.opacity.background-base.value'),
  },
} as const;

// Max width tokens
export const maxWidth = {
  container: getToken('maxWidth.container.value'),
  section: getToken('maxWidth.section.value'),
  card: getToken('maxWidth.card.value'),
} as const;

// Breakpoints
export const breakpoints = {
  mobile: getToken('breakpoints.mobile.value'),
  tablet: getToken('breakpoints.tablet.value'),
  desktop: getToken('breakpoints.desktop.value'),
  wide: getToken('breakpoints.wide.value'),
  ultraWide: getToken('breakpoints.ultra-wide.value'),
} as const;

// Export all tokens
export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  maxWidth,
  breakpoints,
} as const;

export default tokens;

