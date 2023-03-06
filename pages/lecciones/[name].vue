<template>
  <article>
    <header class="flex">
      <!-- TODO: Define a better language for this image accessabiltiy -->
      <NuxtLink to="/lecciones" class="bg-primary-500 rounded-full h-12 w-12 flex justify-center items-center">
        <img src="~/assets/back.svg" alt="Regresar a pantalla principal">
      </NuxtLink>
      <AppHeading class="ml-6 text-primary-700" :level="1">
        De cortesía
      </AppHeading>
    </header>
    <div class="bg-neutral-800 w-4/5 h-32 mx-auto mt-12">Video</div>
    
    <section class="w-full bg-primary-700 text-neutral-100 mt-20">
      <AppHeading :level="2">
        ¿Qué aprenderás en esta lección?
      </AppHeading>
      <!-- TODO: Should be enriched text -->
      <p>En esta sección aprenderas sobre como expresarte usando la lengua de señas para decir las siguientes frases:
Hola
Adiós
Buenos días
Buenas noches</p>
    </section>
  </article>
</template>