/** @types {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      // sans: ['var(--font-roboto)'],
      kelsi: 'kelsi',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        '2xl': '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        accent: {
          100: '#69AEFF',
        },
        dark: {
          100: '#bdbdbd',
          150: '#a4a2a2',
          200: '#333333',
          300: '#565656',
          400: '#4E4E4E',
          500: '#565656',
          700: '#404040',
          900: '#2C2C2C',
        },
        light: {
          100: '#ffffff',
          300: '#fafafa',
          500: '#edf3fa',
          700: '#d5dae0',
          900: '#bdc1c7',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        button: '0px 15px 30px 0px rgba(0, 0, 0, 0.12)',
        icon: `0 4px 8px rgba(0, 0, 0, 0.3)`,
        iconHover: `0 4px 8px rgba(0, 0, 0, 0.8)`,
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-headings': theme.colors.white,
            '--tw-prose-code': theme.colors.white,
            maxWidth: '100%',
            color: theme.colors.white,
            strong: {
              color: theme.colors.white,
              fontWeight: 700,
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-debug-screens'),
    require('autoprefixer'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@tailwindcss/typography')({
      className: 'wysiwyg',
    }),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
