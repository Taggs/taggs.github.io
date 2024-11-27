import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['14px', '20px'],
      sm: ['16px', '24px'],
      base: ['18px', '28px'],
      lg: ['21.6px', '32px'],
      xl: ['25.92px', '36px'],
      '2xl': ['31.104px', '40px'],
      '3xl': ['37.325px', '44px'],
      '4xl': ['44.789px', '48px'],
      '5xl': ['53.747px', '1'],
      '6xl': ['64.496px', '1'],
    },
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        aclonica: ['Aclonica', 'sans-serif'],
        heading: ['Aboreto', 'cursive'],
      },
      colors: {
        primary: {
          DEFAULT: '#42d692',
          dark: '#35b87c',
          light: '#65dba6',
        },
        dark: {
          DEFAULT: '#121212',
          lighter: '#1e1e1e',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: '18px',
            h1: {
              fontFamily: 'Aboreto, cursive',
            },
            h2: {
              fontFamily: 'Aboreto, cursive',
            },
            h3: {
              fontFamily: 'Aboreto, cursive',
            },
            h4: {
              fontFamily: 'Aboreto, cursive',
            },
            h5: {
              fontFamily: 'Aboreto, cursive',
            },
            h6: {
              fontFamily: 'Aboreto, cursive',
            },
          },
        },
      }),
      backgroundColor: {
        dark: '#121212',
      },
    },
  },
  plugins: [typography],
}
