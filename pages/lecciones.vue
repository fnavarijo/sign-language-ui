<script lang="ts" setup>
  import CourseCard from '~/components/Dashboard/CourseCard.vue'
</script>

<template>
  <article class="p-4 mt-10 md:mt-20">
    <h1 class="text-3xl md:text-5xl font-semibold text-primary-700">¿Que señas aprenderás hoy?</h1>
    <section class="mt-8 md:mt-16 grid grid-cols-1 auto-rows-[400px] md:auto-rows-[500px] md:grid-cols-3 gap-5 md:gap-16">
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </section>
  </article>
</template>