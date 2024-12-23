import React from 'react'

import styles from './loading-spinner.module.css'

function LoadingSpinner() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default LoadingSpinner
