import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    colors: {

      'orange': 'hsl(26, 100%, 55%)',

      'pale-orange': 'hsl(25, 100%, 94%)',

      'very-dark-blue': 'hsl(220, 13%, 13%)',

      'dark-grayish-blue': 'hsl(219, 9%, 45%)',

      'grayish-blue': 'hsl(220, 14%, 75%)',

      'light-grayish-blue': 'hsl(223, 64%, 98%)',

      'white': 'hsl(0, 0%, 100%)',

      'black': 'hsl(0, 0%, 0%)',

      'transparent': 'rgba(0, 0, 0, 0)'

    },

    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      // gridTemplateColumns: {
      //   'lg-body': '10rem 1fr',
      //   'md-body': '6rem 1fr',
      //   'sm-body': '4rem 1fr'
        
      // },
      // gridTemplateRows: {
      //   'body': '5rem 1fr'
      // }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
