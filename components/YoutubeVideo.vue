<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';
// TODO: Add Shimer for loading
import YTPlayer from 'yt-player';

interface YoutubeVideoProps {
  videoId?: string;
}

let player: YTPlayer;
const playerDimensions = {
  width: 1080,
  height: 607,
};

const props = defineProps<YoutubeVideoProps>();

onMounted(() => {
  if (props.videoId) {
    player = new YTPlayer('#yt-video');
    player.setSize(playerDimensions.width, playerDimensions.height);
    player.load(props.videoId);
  }
});
onBeforeUnmount(() => {
  player.destroy();
});
</script>

<template>
  <div
    id="yt-video"
    class="mx-auto min-h-[607px] bg-primary-400"
    :class="`w-[${playerDimensions.width}px]`"
  ></div>
</template>
