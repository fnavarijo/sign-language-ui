<script setup>
import { useSlots } from 'vue';

const props = defineProps({
  level: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 6,
  },
});
const slots = useSlots();

const headingTag = `h${props.level}`;

const textSize = {
  h1: 'text-3xl md:text-5xl',
  h2: 'text-2xl md:text-4xl',
};

const Heading = () =>
  h(
    headingTag,
    { class: `${textSize[headingTag]} font-semibold text-inherit` },
    slots
  );
</script>

<template>
  <Heading />
</template>
