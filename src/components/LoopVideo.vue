<template>
  <video muted playsinline ref="el"></video>
</template>
<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { onMounted, ref, unref, useTemplateRef } from 'vue';
import Hls from 'hls.js';
import useMatchResolution from '../scripts/useMatchResolution';
import { STATIC_URL } from '../scripts/constant';

const { startTime, resolutions, videoKey } = defineProps({
  videoKey: {
    type: String,
    required: true,
  },
  resolutions: {
    type: Array<Number>,
    default: () => [],
    required: true,
  },
  startTime: {
    type: Number,
    default: 0,
  },
})

const el = useTemplateRef<HTMLVideoElement>('el')
const resolution = useMatchResolution(resolutions as number[])

const timeoutRef = ref<NodeJS.Timeout>()
useEventListener(el, 'timeupdate', () => {
  const video = el.value
  if (!video) return
  const diffDuration = video.duration - video.currentTime
  const limit = 1
  if (timeoutRef.value && diffDuration > limit) {
    clearTimeout(timeoutRef.value)
    timeoutRef.value = undefined
  }
  if (!timeoutRef.value && diffDuration <= limit) {
    timeoutRef.value = setTimeout(() => {
      video.currentTime = startTime;
      timeoutRef.value = undefined
    }, diffDuration * 1000 - 100)
    return
  }
})

onMounted(() => {
  const video = el.value as HTMLVideoElement
  const level = (resolutions as number[]).indexOf(unref(resolution))
  const { 1: basename, 2: suffix } = videoKey.match(/^(.+)\.([^.]+)$/) as RegExpMatchArray
  if (Hls.isSupported()) {
    const hls = new Hls()
    const url = `${STATIC_URL}/${basename}/playlist.m3u8`
    hls.loadSource(url)
    hls.attachMedia(video)
    hls.nextLevel = level
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    const url = `${STATIC_URL}/${basename}/v${level}/playlist.m3u8`
    video.src = url
  } else {
    const url = `${STATIC_URL}/${basename}/${basename}@${resolution}.${suffix}`
    video.src = url
  }
  video.play()
})
</script>
<style lang="scss" scoped>
video {
  --uno: 'size-full';
}
</style>
