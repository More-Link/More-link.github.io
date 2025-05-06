(() => {
  const d = (() => {
    let id
    return (cb) => {
      return (...args) => {
        clearTimeout(id)
        id = setTimeout(() => cb(...args), 25)
      }
    }
  })()
  
  let prevTop = document.documentElement.scrollTop
  
  document.addEventListener('scroll', d((event) => {
    const classnames = [
      ['header_container', 'banner_container'],
      'features',
      'footer_container',
    ]
    const map = classnames.map((classname) => {
      const names = Array.isArray(classname) ? classname : [classname, classname]
      const startEle = document.getElementsByClassName(names[0])[0]
      const endEle = document.getElementsByClassName(names[names.length - 1])[0]
      return [startEle.offsetTop, endEle.offsetTop + endEle.clientHeight - 1]
    })
    const currentEle = event.target.documentElement
    const currentTop = currentEle.scrollTop
    if (currentTop === prevTop) return
    const index = map.findIndex(([top, bottom]) => top < currentTop && currentTop <= bottom)
    if (index >= 0) {
      if (currentTop > prevTop) {
        // down
        currentEle.scrollTo({
          top: map[index + 1][0],
          left: 0,
          behavior: 'smooth',
        })
      } else if (currentTop < prevTop) {
        // up
        currentEle.scrollTo({
          top: map[index][0],
          left: 0,
          behavior: 'smooth',
        })
      }
    }
    prevTop = currentTop
  }))
})()
