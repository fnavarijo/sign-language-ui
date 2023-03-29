<script lang="ts" setup>
  import {onMounted, onBeforeUnmount} from 'vue'
  // TODO: Add Shimer for loading
  import YTPlayer from 'yt-player'

  interface YoutubeVideoProps {
    videoId?: string;
  }

  const props = defineProps<YoutubeVideoProps>()

  let player;
  
  onMounted(() => {
    player = new YTPlayer('#yt-video')
    player.setSize(1080, 607)
    player.load(props.videoId)
    // if (props.videoId) {
    // }
  })

  onBeforeUnmount(() => {
    if (player) {
      player.destroy()
    }
  })
</script>

<template>
  <div id="yt-video" class="mx-auto min-h-[607px]">
  </div>
</template>

