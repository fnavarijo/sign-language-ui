<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';

import { getSanityImage } from '~/transformers/image';
import { fetchLessonsWithProgress } from '~/lib/queries/fetchLessonsWithProgress';

import CourseCard from '~/components/Dashboard/CourseCard.vue';

const { isAuthenticated, user } = useAuth0();

// Redirect to / if user is not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/');
  }
});

type SanityResouce = {
  asset: {
    _ref: string;
  };
};

// Join Types
type SanityLection = {
  _id: string;
  name: string;
  description: string;
  sign: SanityResouce;
};

const { data: lections } = await useAsyncData('lections', async () => {
  const query = fetchLessonsWithProgress({
    userEmail: user.value?.email!,
  });

  const { data } = await useSanityQuery<SanityLection[]>(query);
  return data?.value?.map((lection) => ({
    lectionId: lection._id,
    name: lection.name,
    description: lection.description,
    signImageUrl: getSanityImage(lection.sign.asset._ref),
    progress: lection.progress[0]?.status,
  }));
});
</script>

<template>
  <article class="p-4 mt-10 md:mt-20">
    <AppHeading :level="1" class="text-primary-700"
      >¿Que señas aprenderás hoy?</AppHeading
    >
    <section
      class="mt-8 md:mt-16 grid grid-cols-1 auto-rows-[400px] md:auto-rows-[500px] md:grid-cols-3 gap-5 md:gap-16"
    >
      <CourseCard
        v-for="(lection, index) in lections"
        v-bind="lection"
        :key="index"
      />
    </section>
  </article>
</template>
