<script setup>
  defineProps({
    lectionId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    signImageUrl: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <!-- TODO:
    Should animate this on hover. Think on a good animation   -->
  <NuxtLink :to="`/lecciones/${lectionId}`" class="block">
    <div class="grid grid-rows-course-card-rows h-full">
      <div class="h-full bg-primary-400 rounded-t-xl overflow-hidden">
        <img class="w-full h-full object-cover object-[50%_20%]" :src="signImageUrl" alt="" />
      </div>
      <div class="py-6 px-4 md:px-8 bg-primary-700 rounded-b-xl text-neutral-100 text-center">
        <div class="font-bold text-xl md:text-2xl">{{ name }}</div>
        <p class="text-sm mt-2 text-ellipsis line-clamp-2 min-h-[2.5rem]">
          {{ description }}
        </p>
        <button class="text-primary-400 font-bold mt-8">
          Explorar
        </button>
      </div>
    </div>
  </NuxtLink>
</template>