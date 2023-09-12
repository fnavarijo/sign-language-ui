<template>
  <div
    class="container text-center w-full mt-16 grid grid-cols-1 justify-center md:grid-cols-2 gap-8 items-center"
  >
    <div class="text-left">
      <AppHeading :level="1" class="text-primary-700" is-bold>
        Debloquea un mundo nuevo de comunicación
      </AppHeading>
      <p class="mt-4 md:mt-8">
        Embarcate en el emocionante viaje hacia la comunicación inclusiva.
        Desarrolla tus habilidades y aprende la lengua de señas.
      </p>
      <button
        class="bg-primary-700 text-primary-100 rounded-xl px-5 py-3 font-semibold mt-4 md:mt-12"
      >
        Quiero Aprender
      </button>
    </div>
    <div class="relative spotlight before:bg-primary-300/[0.65]">
      <img class="relative z-10" src="~/assets/online-learning.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - 164px);
}
.spotlight::before {
  content: '';
  width: 80%;
  height: 80%;
  border-radius: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
