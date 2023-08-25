<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

// const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

// const login = () => {
//   loginWithRedirect();
// };

// const logoutUser = () => {
//   logout({ logoutParams: { returnTo: window.location.origin } });
// };

// TODO: We could move cerrar session to a component and render it only on client
</script>

<template>
  <nav class="p-4 md:mt-6">
    <ul class="w-full flex justify-end space-x-6 font-semibold">
      <li class="text-primary-500">
        <NuxtLink to="/lecciones">Lecciones</NuxtLink>
      </li>
      <li v-if="!isAuthenticated">
        <button @click="login">Iniciar sesión</button>
      </li>
      <li v-else>
        <button @click="logoutUser">Cerrar sesión</button>
      </li>
    </ul>
  </nav>
</template>
