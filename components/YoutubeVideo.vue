<script lang="ts" setup>
  import {onMounted, onBeforeUnmount} from 'vue'
  // TODO: Add types for this library
  // TODO: Add Shimer for loading
  import YTPlayer from 'yt-player'
  let player;

  const props = defineProps({
    videoId: {
      type: String,
      required: true
    }
  })
  
  onMounted(() => {
    player = new YTPlayer('#yt-video')
    player.setSize(1080, 607)
    player.load(props.videoId)
  })

  onBeforeUnmount(() => {
    player.destroy()
  })
</script>

<template>
  <div id="yt-video" class="mx-auto min-h-[607px]" >
    
  </div>
</template>

