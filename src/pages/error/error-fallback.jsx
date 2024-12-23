import MainLayout from '@/components/layout/main-layout'

import styles from './error-fallback.module.css'

function Error404() {
  return (
    <MainLayout>
      <section className={styles['error-container']}>
        <h1>Error 404</h1>
        <p>We are sorry, but this is not the page you are looking for.</p>
      </section>
    </MainLayout>
  )
}

export default Error404
