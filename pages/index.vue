<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { getAccessTokenSilently } = useAuth0();

const sendPostRequest = async () => {
  // get access_token from Auth0 client authentication
  const token = await getAccessTokenSilently();
  console.log('Access token', token);

  // Fetch request to the route /api/saveProgress
  fetch('/api/saveProgress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      // Send the current lesson id
      lessonId: 'lesson-1',
    }),
  });
};
</script>

<template>
  <div class="text-center w-full mt-16">
    <AppHeading :level="1" class="text-primary-700">
      Lengua de Señas
    </AppHeading>
    <p class="mt-4">Desarrolla tus habilidades y aprende la lengua de señas.</p>
    <button @click="sendPostRequest">Doing request</button>
  </div>
</template>
