import { createAuth0 } from '@auth0/auth0-vue';

/**
 * Auth0 is installed on client side. It depends on window, so it can throw errors on server side. (Infinite loop)
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();

  const auth0Config = createAuth0({
    domain: appConfig.authClientDomain,
    clientId: appConfig.authClientId,
    authorizationParams: {
      redirect_uri: appConfig.authRedirectUri,
    },
  });

  nuxtApp.vueApp.use(auth0Config);
});
