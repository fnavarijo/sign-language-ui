<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const player = ref(null);
const videoElement = ref(null);

const { videoSrc, playerOptions } = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
  playerOptions: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['play', 'finished']);

onMounted(() => {
  // Create the video.js player when the component is mounted
  player.value = videojs(
    videoElement.value,
    playerOptions,
    function onPlayerReady() {
      console.log('Video player is ready.');
    }
  );

  // Set the video source
  player.value.src(videoSrc);

  player.value.one('play', () => {
    emit('play');
  });

  player.value.on('ended', () => {
    emit('finished');
  });
});

onBeforeUnmount(() => {
  // Dispose of the video.js player when the component is unmounted
  if (player.value) {
    player.value.dispose();
    player.value = null;
  }
});
</script>

<template>
  <div class="video-player">
    <video
      ref="videoElement"
      class="video-js vjs-default-skin"
      :options="playerOptions"
    ></video>
  </div>
</template>

<style>
.video-player {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
</style>
