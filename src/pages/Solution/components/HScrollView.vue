<template>
  <div class="h-scroll-view" ref="view">
    <div class="arrow" @click="() => prev()"><img src="../images/btn_arrowpre.png"></div>
    <div class="content" ref="content">
      <div class="padding" ref="head"></div>
      <slot />
      <div class="padding" ref="foot"></div>
    </div>
    <div class="arrow" @click="() => next()"><img src="../images/btn_arrownext.png"></div>
  </div>
</template>
<script setup lang="ts">
import { useElementBounding, useResizeObserver } from '@vueuse/core';
import { computed, onMounted, shallowRef, unref, useTemplateRef, watch } from 'vue';

const rootElementRef = useTemplateRef('view')
const containerElementRef = useTemplateRef('content')
const paddingHeadRef = useTemplateRef('head')
const paddingFootRef = useTemplateRef('foot')
const contentElementsRef = computed(() => {
  const containerElement = containerElementRef.value
  if (!containerElement) return []
  const headElement = paddingHeadRef.value
  const footElement = paddingFootRef.value
  const contentElements = Array.from(containerElement.children)
  return contentElements.filter((el) => el !== headElement && el !== footElement)
})

const indexRef = shallowRef(0)

const currentContentElement = computed(() => {
  const elements = contentElementsRef.value as HTMLDivElement[]
  return elements[indexRef.value]
})

const { width: containerWidthRef, left: containerLeftRef } = useElementBounding(containerElementRef)
const { offsetLeft: currentContentOffsetLeftRef } = { offsetLeft: computed(() => ( unref(currentContentElement)?.offsetLeft || 0 )) }
const { width: currentContentWidthRef } = useElementBounding(currentContentElement)

const prev = () => {
  if (indexRef.value === 0) return
  indexRef.value -= 1
}
const next = () => {
  const elements = contentElementsRef.value
  if (indexRef.value === elements.length - 1) return
  indexRef.value += 1
}

const setActiveContent = () => {
  contentElementsRef.value.forEach((el) => el.classList.remove('active'))
  currentContentElement.value.classList.add('active')
}
const scrollTo = (ani = true) => {
  if (!containerElementRef.value) return
  const nextLeft = currentContentOffsetLeftRef.value - containerLeftRef.value + (currentContentWidthRef.value / 2) - (containerWidthRef.value / 2) - 100
  containerElementRef.value.scrollTo({
    left: nextLeft,
    behavior: ani ? 'smooth' : undefined,
  })
}

useResizeObserver([rootElementRef, containerElementRef], () => scrollTo())
watch([containerLeftRef, currentContentWidthRef, currentContentOffsetLeftRef], () => scrollTo())
watch([indexRef, contentElementsRef], () => {
  scrollTo()
  setActiveContent()
})
onMounted(() => {
  setActiveContent()
  scrollTo(false)
})

</script>
<style lang="scss" scoped>
.h-scroll-view {
  --uno: 'flex-row-nowrap justify-between items-center w-full h-full';
  .arrow {
    --uno: 'flex justify-center items-center group-0 shrink-0 cursor-pointer w-[50px] h-[200px]';
    @screen sm {
      --uno: 'w-[140px]';
    }
  }
  .content {
    --uno: 'flex-row-nowrap items-center w-full h-full overflow-hidden gap-[60px]';
    @screen sm {
      --uno: 'gap-[80px]';
    }
  }
  .padding {
    --uno: 'block p-[50%] h-[1px]';
  }
}
</style>
<style lang="scss">
.h-scroll-view {
  .content {
    & > * {
      --uno: 'duration-700 delay-100';
      &:not(.active) {
        --uno: 'grayscale opacity-50';
      }
      &.active {
        --uno: 'scale-200';
      }
    }
  }
}
</style>
