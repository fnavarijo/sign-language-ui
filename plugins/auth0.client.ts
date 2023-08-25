import { createAuth0 } from '@auth0/auth0-vue';

/**
 * Auth0 is installed on client side. It depends on window, so it can throw errors on server side. (Infinite loop)
 */
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  const auth0Config = createAuth0({
    domain: runtimeConfig.public.authClientDomain,
    clientId: runtimeConfig.public.authClientId,
    authorizationParams: {
      redirect_uri: runtimeConfig.public.authRedirectUri,
      audience: runtimeConfig.public.authAudience,
    },
  });

  nuxtApp.vueApp.use(auth0Config);
});
