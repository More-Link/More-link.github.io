<template>
  <video muted playsinline ref="el"></video>
</template>
<script setup lang="ts">
import { useEventListener, watchImmediate } from '@vueuse/core';
import { computed, ref, toRefs, unref, useTemplateRef } from 'vue';
import Hls from 'hls.js';
import useMatchResolution from '../scripts/useMatchResolution';
import useStaticDomain from '../scripts/useStaticDomain';

const FALLBACK_DOMAIN = 'https://static.more-link.com.hk'

const props = withDefaults(
  defineProps<{ videoKey: string, resolutions: number[], backTime?: number }>(),
  {
    backTime: 0,
    resolutions: () => [],
  },
) 
const { backTime, resolutions, videoKey } = toRefs(props)

const el = useTemplateRef<HTMLVideoElement>('el')

// #region Video Playback Control
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
      video.currentTime = unref(backTime);
      timeoutRef.value = undefined
    }, diffDuration * 1000 - 100)
    return
  }
})
// #endregion Video Playback Control

// #region Video Play Control
const staticDomainRef = useStaticDomain()
const resolution = useMatchResolution(resolutions)
const videoTypeRef = computed(() => {
  const video = el.value as HTMLVideoElement
  if (Hls.isSupported()) return 'hls'
  if (video.canPlayType('application/vnd.apple.mpegurl')) return 'apple'
  return 'raw'
})
const videoLevelRef = computed(() => {
  return unref(resolutions).indexOf(unref(resolution))
})

watchImmediate(staticDomainRef, () => {
  const video = el.value as HTMLVideoElement
  const videoType = unref(videoTypeRef)
  const videoLevel = unref(videoLevelRef)
  const staticDomain = unref(staticDomainRef)
  if (staticDomain === undefined) return
  const { 1: basename, 2: suffix } = unref(videoKey).match(/^(.+)\.([^.]+)$/) as RegExpMatchArray
  if (staticDomain === undefined) return
  if (staticDomain) {
    if (videoType === 'hls') {
      const hls = new Hls()
      const url = `${staticDomain}/${basename}/playlist.m3u8`
      hls.loadSource(url)
      hls.attachMedia(video)
      hls.nextLevel = videoLevel
    } else if (videoType === 'apple') {
      const url = `${staticDomain}/${basename}/v${videoLevel}/playlist.m3u8`
      video.src = url
    }
  } else {
    const url = `${FALLBACK_DOMAIN}/${basename}/${basename}@${resolution}.${suffix}`
    video.src = url
  }
  video.play()
})
// #endregion Video Play Control
</script>
<style lang="scss" scoped>
video {
  --uno-apply: size-full z-[0];
}
</style>
