import { useEffect, useState } from 'react'

function useDeviceWidth() {
  const [deviceWidth, setDeviceWidth] = useState()

  useEffect(() => {
    let timeout

    const getDeviceWidth = (delay) => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        setDeviceWidth(window.innerWidth)
      }, delay)
    }

    window.addEventListener('resize', () => getDeviceWidth(100))

    getDeviceWidth(0)

    return () => {
      window.removeEventListener('resize', getDeviceWidth)
      clearTimeout(timeout)
    }
  }, [])

  return {
    deviceWidth,
  }
}

export default useDeviceWidth
