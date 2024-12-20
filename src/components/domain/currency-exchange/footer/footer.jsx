import styles from './footer.module.css'

function Footer({ date, fromCurrency, fromLabel, toCurrency, toLabel }) {
  const fromUrl = `https://www.xe.com/currency/${fromCurrency?.toLowerCase()}-${fromLabel?.toLowerCase().replace(' ', '-')}/`
  const toUrl = `https://www.xe.com/currency/${toCurrency?.toLowerCase()}-${toLabel?.toLowerCase().replace(' ', '-')}/`

  return (
    <footer className={styles.footer}>
      <p>
        <a className={styles.link} href={fromUrl}>
          {fromLabel}
        </a>{' '}
        to{' '}
        <a className={styles.link} href={toUrl}>
          {toLabel}
        </a>{' '}
        {`conversion — Last updated ${date}`}
      </p>
    </footer>
  )
}

export default Footer
