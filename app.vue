<template>
  <div class="relative">
    <div class="max-w-screen-xl mx-auto">
      <AppNav />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
html, body { 
  @apply bg-primary-100 font-body;
}

.content-block > ul {
  @apply list-disc pl-8;
}

</style>