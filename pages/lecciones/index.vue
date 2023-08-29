<script lang="ts" setup>
import '@sanity/client';
import { useAuth0 } from '@auth0/auth0-vue';

import { getSanityImage } from '~/transformers/image';
import { fetchLessonsByUser } from '~/lib/queries/fetchLessonsByUser';
import { Lesson, LessonWithProgress } from '~/types/sanity';

import CourseCard from '~/components/Dashboard/CourseCard.vue';

const { isAuthenticated, user } = useAuth0();

// Redirect to / if user is not authenticated
// Is there a way to check that the user is authenticated before doing the redirection?
onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/');
  }
});

const { data: lessons } = await useAsyncData('lessons', async () => {
  const query = fetchLessonsByUser({
    email: user.value?.email!,
  });

  const { data } = await useSanityQuery<Lesson[]>(query);
  return (data?.value as LessonWithProgress[]).map((lesson) => ({
    lectionId: lesson._id,
    name: lesson.name,
    description: lesson.description,
    signImageUrl: getSanityImage(lesson.sign.asset._ref),
    progress: lesson.progress[0]?.status,
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
        v-for="(lection, index) in lessons"
        v-bind="lection"
        :key="index"
      />
    </section>
  </article>
</template>
