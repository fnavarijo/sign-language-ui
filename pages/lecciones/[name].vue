<script lang="ts" setup>
import YoutubeVideo from '~/components/YoutubeVideo.vue';

type SanityResouce = {
  asset: {
    _ref: string;
  }
}

type SanityLection = {
  name: string;
  description: string;
  content: string;
  sign: SanityResouce;
  video: string;
}

const route = useRoute()
const { name: lectionId} = route.params

const { data: lection } = await useAsyncData(`lections-${lectionId}`, async () => {
  const query = groq`*[_type == "lesson" && _id == "${lectionId}"]`;
  const { data } = await useSanityQuery<SanityLection[]>(query); 

  const lection = data.value?.[0]
  
  if (!lection) {
    return null
  }
 
  const [_, videoId] = lection.video.split('?v=')

  return {
    name: lection.name,
    content: lection.content,
    videoId: videoId,
  }
});

if (!lection.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

</script>

<template>
  <article>
    <header class="flex">
      <!-- TODO: Define a better language for this image accessabiltiy -->
      <NuxtLink to="/lecciones" class="bg-primary-500 rounded-full h-12 w-12 flex justify-center items-center">
        <img src="~/assets/back.svg" alt="Regresar a pantalla principal">
      </NuxtLink>
      <AppHeading class="ml-6 text-primary-700" :level="1">
        {{ lection?.name }}
      </AppHeading>
    </header>
    <section class="mt-10">
      <YoutubeVideo :video-id="lection?.videoId" />
    </section>
    
    <section class="w-full min-h-[40vh] bg-primary-700 text-neutral-100 mt-20 absolute left-0">
      <div class="max-w-screen-xl mx-auto">
        <AppHeading :level="2" class="mt-12">
          ¿Qué aprenderás en esta lección?
        </AppHeading>
        <!-- TODO: Should be enriched text -->
        <div class="grid grid-cols-[3fr_1fr]">
          <p class="mt-6">
            {{ lection?.content }}
          </p>
          <div class="relative overflow-hidden">
            <img class="w-full absolute" src="https://cdn.sanity.io/images/4xfj4i31/production/5a8a3aadb57d95855b422c1763912cf996ff4bd0-720x1080.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  </article>
</template>