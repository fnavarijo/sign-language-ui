import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    colors: {
      primary: {
        100: '#EBFBFC',
        400: '#99DFE2',
        500: '#00AFB9',
        700: '#004347',
      },
      neutral: {
        100: '#F3F5F5',
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
        'course-card-rows': 'minmax(0, 1fr) auto'
      }
    },
  },
};
