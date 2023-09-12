<script setup>
import { useSlots } from 'vue';

const props = defineProps({
  level: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 6,
  },
  isBold: {
    type: Boolean,
    default: false,
  },
});
const slots = useSlots();

const headingTag = `h${props.level}`;

const textSize = {
  h1: 'text-3xl md:text-5xl',
  h2: 'text-2xl md:text-4xl',
};

const titleWeightClass = props.isBold ? 'font-bold' : 'font-semibold';

const Heading = () =>
  h(
    headingTag,
    { class: `${textSize[headingTag]} ${titleWeightClass} text-inherit` },
    slots
  );
</script>

<template>
  <Heading />
</template>
