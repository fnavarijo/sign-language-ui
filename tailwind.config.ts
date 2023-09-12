import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    colors: {
      primary: {
        100: '#EBFBFC',
        300: '#44BBA4',
        400: '#99DFE2',
        500: '#00AFB9',
        700: '#004347',
      },
      neutral: {
        100: '#F3F5F5',
        400: '#c7d1d1',
        800: '#1D2227',
      },
    },
    extend: {
      fontFamily: {
        body: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          '"sans - serif"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      gridTemplateRows: {
        'course-card-rows': 'minmax(0, 1fr) auto',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
