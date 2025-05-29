import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        elf: {
          100: '#E6F3F1',
          200: '#CEE6E2',
          300: '#B5DAD4',
          700: '#52A89B',
          900: '#399C8D',
          DEFAULT:'#088370 '
        } , 
        mango:{
          100: '#FEF9EE',
          200: '#FEF2DE',
          300: '#FDECCD',
          400: '#02A991',
          700: '#FBD28A',
          900: '#FACC79',
          DEFAULT:'#F9BF58'
        },
        greenDark:{
          DEFAULT:'#152422'
        }
      },
      fontFamily: {
        "Dana": "Dana",
        'DanaMedium': 'Dana Medium',
        'DanaDemiBold': 'Dana DemiBold',
        'MorabbaLight':'Morabba Light',
        'MorabbaMedium':'Morabba Medium',
        'MorabbaBold':'Morabba Bold'
      },
  
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg:'0.625rem'
        }
      }
    },
    screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1240px'
      }
  },
  plugins: [
    function ({ addVariant }:any) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
};
export default config;
