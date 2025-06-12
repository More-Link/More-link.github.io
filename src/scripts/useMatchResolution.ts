import { computed, MaybeRef, unref } from "vue"

const useMatchResolution = (resolutions: MaybeRef<number[]> = []) => {
  const currentWidth = screen.availWidth
  return computed(() => {
    let targetResolution = -1
    const currentResolutions = unref(resolutions)
    for (const resolution of currentResolutions) {
      if (resolution >= currentWidth) {
        targetResolution = resolution
        break
      }
    }
    if (targetResolution === -1) {
      targetResolution = currentResolutions[currentResolutions.length - 1]
    }
    return targetResolution
  })
}

export default useMatchResolution
