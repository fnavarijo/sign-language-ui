<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { SanityBlocks } from 'sanity-blocks-vue-component';

import { getSanityImage } from '~/transformers/image';
import { fetchLesson } from '~/lib/queries/fetchLesson';
import { Lesson } from '~/types/sanity';

import BackIcon from '~/assets/back.svg?component';
import VideoPlayer from '~/components/Common/VideoPlayer.vue';

const route = useRoute();
const { getAccessTokenSilently, user } = useAuth0();

const { name: lessonId } = route.params;
const token = await getAccessTokenSilently();

// TODO: Add 404 page when lesson is not found
const { data: lesson } = await useAsyncData(
  `lections-${lessonId}`,
  async () => {
    const query = fetchLesson({ id: lessonId, userEmail: user.value?.email! });
    const { data } = await useSanityQuery<Lesson[]>(query);

    const lesson = data.value;

    if (!lesson) {
      return null;
    }

    const [_, videoId] = lesson.video.split('?v=');

    return {
      id: lesson._id,
      name: lesson.name,
      content: lesson.content,
      videoId: videoId,
      signImageUrl: getSanityImage(lesson.sign.asset._ref),
      progressStatus: lesson.progress[0]?.status,
      progressId: lesson.progress[0]?._id,
    };
  }
);

const playerOptions = {
  autoplay: false,
  controls: true,
  fluid: true,
};

if (!lesson.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

// TODO: status need typing
async function saveProgress({ status = 'started' }) {
  return await fetch('/api/saveProgress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      userEmail: user.value?.email!,
      lessonRef: lesson.value?.id,
      status,
      relationId: lesson.value?.progressId,
    }),
  });
}

async function onPlay() {
  if (
    lesson.value?.progressStatus === 'started' ||
    lesson.value?.progressStatus === 'completed'
  ) {
    return;
  }
  // TODO: what happens if this fails? Should we show an error message?
  await saveProgress({ status: 'started' });
}

async function onEnd() {
  if (lesson.value?.progressStatus === 'completed') {
    return;
  }

  await saveProgress({ status: 'completed' });
}
</script>

<template>
  <article>
    <header class="flex">
      <!-- TODO: Define a better language for this image accessabiltiy -->
      <NuxtLink
        to="/lecciones"
        class="bg-primary-500 rounded-full h-12 w-12 flex justify-center items-center"
      >
        <!-- TODO: Need to make the icon centered -->
        <BackIcon />
      </NuxtLink>
      <AppHeading class="ml-6 text-primary-700" :level="1">
        {{ lesson?.name }}
      </AppHeading>
    </header>
    <section class="mt-10">
      <ClientOnly>
        <VideoPlayer
          video-src="https://res.cloudinary.com/dkvtpo8w1/video/upload/v1691037209/Videos/boop-it.mp4"
          :playerOptions="playerOptions"
          @play="onPlay"
          @finished="onEnd"
        />
      </ClientOnly>
    </section>

    <section
      class="px-4 xl:px-0 absolute left-0 w-full min-h-[40vh] bg-primary-700 text-neutral-100 mt-20 overflow-hidden flex justify-center"
    >
      <div class="absolute w-full h-full max-w-screen-xl px-4">
        <AppHeading :level="2" class="mt-12">
          ¿Qué aprenderás en esta lección?
        </AppHeading>
        <div class="grid grid-cols-[3fr_1fr]">
          <div class="mt-6 content-block">
            <SanityBlocks :blocks="lesson?.content" />
          </div>
          <img
            class="absolute bottom-0 right-0 w-80 transform translate-y-1/4"
            :src="lesson?.signImageUrl"
            alt=""
          />
        </div>
      </div>
    </section>
  </article>
</template>
