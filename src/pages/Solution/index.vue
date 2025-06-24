<template>
  <List v-if="!isDetail"></List>
  <Detail v-else></Detail>
</template>
<script lang="ts" setup>
import List from './List.vue'
import Detail from './Detail.vue'
import { computed } from '@vue/reactivity'
import { PLATFORM } from './constant'
import { useRoute } from 'vue-router'

const route = useRoute()

const isDetail = computed(() => {
  if (route.params.id && Object.values(PLATFORM).includes(route.params.id as PLATFORM)) {
    return true
  }
  return false
})
</script>
