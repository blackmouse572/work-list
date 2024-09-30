import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    addCommonColors: true,
    themes: {
      light: {
        colors: {
          background: "#FFFFFF", // or DEFAULT
          foreground: "#121212", // or 50 to 900 DEFAULT
        },
      },
      dark: {
        colors: {
          background: "#121212", // or DEFAULT
          foreground: "#FFFFFF", // or 50 to 900 DEFAULT
        },
      },
    },
  }), animate, typography],
};
export default config;
