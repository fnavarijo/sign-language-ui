import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/sanity'],
  googleFonts: {
    families: {
      Poppins: [300, 400, 600, 700],
    },
  },
  sanity: {
    projectId: '4xfj4i31',
    apiVersion: '2023-03-15',
    token: process.env.SANITY_SECRET_TOKEN,
  },
  vite: {
    plugins: [svgLoader()],
  },
});
