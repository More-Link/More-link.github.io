import { createGlobalState, useFetch } from "@vueuse/core";
import { onMounted, shallowRef } from "vue";

const CDN_DOMAINS = [
  'https://fastly.jsdelivr.net/gh/More-Link/static_resources/static',
  'https://originfastly.jsdelivr.net/gh/More-Link/static_resources/static',
  'https://gcore.jsdelivr.net/gh/More-Link/static_resources/static',
  'https://testingcf.jsdelivr.net/gh/More-Link/static_resources/static',
  'https://quantil.jsdelivr.net/gh/More-Link/static_resources/static',
  'https://cdn.jsdelivr.net/gh/More-Link/static_resources/static',
  'https://static.more-link.com.hk',
] as const

const useCurrentStaticDomain = createGlobalState(() => shallowRef<string | undefined | null>(undefined))
const useFetching = createGlobalState(() => shallowRef<boolean>(false))

function useStaticDomain() {
  const currentDomainRef = useCurrentStaticDomain()
  const isFetchingRef = useFetching()
  onMounted(async () => {
    if (isFetchingRef.value) return
    isFetchingRef.value = true
    if (currentDomainRef.value) return

    const controllers: AbortController[] = []
    const requests = CDN_DOMAINS.map(domain => {
      const controller = new AbortController()
      controllers.push(controller)
      return fetch(`${domain}/CNAME`, { signal: controller.signal }).then(() => domain)
    })
    try {
      const result = await Promise.race(requests)
      if (!currentDomainRef.value) {
        currentDomainRef.value = result
        console.info(`Using static domain: ${result}`)
      }
      controllers.forEach(controller => {
        if (controller.signal.aborted) return
        controller.abort()
      })
    } catch (error) {
      currentDomainRef.value = null
    } finally {
      isFetchingRef.value = false
    }
  })
  return currentDomainRef
}

export default useStaticDomain
