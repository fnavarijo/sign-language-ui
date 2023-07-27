<template>
  <div class="relative">
    <div class="max-w-screen-xl mx-auto px-4">
      <ClientOnly>
        <AppNav />
        <NuxtPage />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
html,
body {
  @apply bg-primary-100 font-body;
}

.content-block > ul {
  @apply list-disc pl-8;
}
</style>
