<script lang="ts" setup>
import CheckIcon from '~/assets/check.svg?component';
import WaitIcon from '~/assets/wait.svg?component';

enum StatusProgress {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

const props = defineProps({
  lectionId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  signImageUrl: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
    validator: (value) => {
      return (
        value === StatusProgress.NotStarted ||
        value === StatusProgress.InProgress ||
        value === StatusProgress.Completed
      );
    },
  },
});

const progressClass = computed(() => {
  switch (props.progress) {
    case StatusProgress.NotStarted:
      return 'bg-neutral-400';
    case StatusProgress.InProgress:
      return 'bg-primary-700';
    case StatusProgress.Completed:
      return 'bg-primary-700';
  }
});

const ProgressIcon = computed(() => {
  switch (props.progress) {
    case StatusProgress.NotStarted:
      return WaitIcon;
    case StatusProgress.InProgress:
      return WaitIcon;
    case StatusProgress.Completed:
      return CheckIcon;
  }
});
</script>

<template>
  <!-- TODO:
    Should animate this on hover. Think on a good animation   -->
  <NuxtLink :to="`/lecciones/${lectionId}`" class="block">
    <div class="grid grid-rows-course-card-rows h-full relative">
      <div
        class="absolute h-12 w-12 top-4 right-4 rounded-full flex items-center justify-center"
        :class="[progressClass]"
      >
        <ProgressIcon class="fill-neutral-100 w-8 h-8" />
      </div>
      <div class="h-full bg-primary-400 rounded-t-xl overflow-hidden">
        <img
          class="w-full h-full object-cover object-[50%_20%]"
          :src="signImageUrl"
          alt=""
        />
      </div>
      <div
        class="py-6 px-4 md:px-8 bg-primary-700 rounded-b-xl text-neutral-100 text-center"
      >
        <div class="font-bold text-xl md:text-2xl">{{ name }}</div>
        <p class="text-sm mt-2 text-ellipsis line-clamp-2 min-h-[2.5rem]">
          {{ description }}
        </p>
        <button class="text-primary-400 font-bold mt-8">Explorar</button>
      </div>
    </div>
  </NuxtLink>
</template>
