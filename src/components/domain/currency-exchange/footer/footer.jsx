import styles from './footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <a className={styles.link} href='https://www.xe.com/currency/eur-euro/'>
          Euro
        </a>{' '}
        to{' '}
        <a className={styles.link} href='https://www.xe.com/currency/eur-euro/'>
          US Dollar
        </a>{' '}
        conversion — Last updated Dec 15, 2022, 19:17 UTC
      </p>
    </footer>
  )
}

export default Footer
