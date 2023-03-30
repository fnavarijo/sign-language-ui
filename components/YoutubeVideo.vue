<script lang="ts" setup>
import { onMounted } from 'vue';
// TODO: Add Shimer for loading
import YoutubePlayer from 'youtube-player'

interface YoutubeVideoProps {
  videoId?: string;
}

const props = defineProps<YoutubeVideoProps>();

const playerDimensions = {
  width: 1080,
  height: 607,
};

onMounted(() => {
  if (props.videoId) {
    YoutubePlayer('yt-video', {
      videoId: props.videoId,
      ...playerDimensions
    });
  }
});
</script>

<template>
  <div
    id="yt-video"
    class="mx-auto min-h-[607px] bg-primary-400"
    :class="`w-[${playerDimensions.width}px]`"
  ></div>
</template>
