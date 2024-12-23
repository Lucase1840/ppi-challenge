import { useEffect, useState } from 'react'

function useDeviceWidth(delay) {
  const [deviceWidth, setDeviceWidth] = useState()

  useEffect(() => {
    let timeout

    const getDeviceWidth = (waitFor) => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        setDeviceWidth(window.innerWidth)
      }, waitFor)
    }

    window.addEventListener('resize', () => getDeviceWidth(delay))

    getDeviceWidth(0)

    return () => {
      window.removeEventListener('resize', getDeviceWidth)
      clearTimeout(timeout)
    }
  }, [delay])

  return {
    deviceWidth,
  }
}

export default useDeviceWidth
