<script lang="ts" setup>
import { SanityBlocks } from 'sanity-blocks-vue-component'

import { getSanityImage } from '~/transformers/image';
import { Lection } from '~/types/sanity-resources/Lection'

import YoutubeVideo from '~/components/YoutubeVideo.vue';

const route = useRoute()
const { name: lectionId} = route.params

const { data: lection } = await useAsyncData(`lections-${lectionId}`, async () => {
  const query = groq`*[_type == "lesson" && _id == "${lectionId}"]`;
  const { data } = await useSanityQuery<Lection[]>(query); 

  const lection = data.value?.[0]
  
  if (!lection) {
    return null
  }
 
  const [_, videoId] = lection.video.split('?v=')

  return {
    name: lection.name,
    content: lection.content,
    videoId: videoId,
    signImageUrl: getSanityImage(lection.sign.asset._ref),
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
    
    <section class="px-4 xl:px-0 absolute left-0 w-full min-h-[40vh] bg-primary-700 text-neutral-100 mt-20 overflow-hidden flex justify-center">
      <div class="absolute w-full h-full max-w-screen-xl px-4">
        <AppHeading :level="2" class="mt-12">
          ¿Qué aprenderás en esta lección?
        </AppHeading>
        <div class="grid grid-cols-[3fr_1fr]">
          <div class="mt-6 content-block">
            <SanityBlocks :blocks="lection?.content" />
          </div>
          <img class="absolute bottom-0 right-0 w-80 transform translate-y-1/4 " :src="lection?.signImageUrl" alt="" />
        </div>
      </div>
    </section>
  </article>
</template>
