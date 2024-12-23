import useCurrencyExchange from '@/hooks/use-currency-exchange'

import styles from './footer.module.css'

function Footer() {
  const { date, fromCurrency, fromLabel, toCurrency, toLabel } = useCurrencyExchange()

  const fromUrl = `https://www.xe.com/currency/${fromCurrency?.toLowerCase()}-${fromLabel?.toLowerCase().replace(' ', '-')}/`
  const toUrl = `https://www.xe.com/currency/${toCurrency?.toLowerCase()}-${toLabel?.toLowerCase().replace(' ', '-')}/`

  return (
    <footer className={styles.footer}>
      <p>
        <a className={styles.link} href={fromUrl} rel='noopener noreferrer' target='_blank'>
          {fromLabel}
        </a>{' '}
        to{' '}
        <a className={styles.link} href={toUrl} rel='noopener noreferrer' target='_blank'>
          {toLabel}
        </a>{' '}
        {`conversion — Last updated ${date}`}
      </p>
    </footer>
  )
}

export default Footer
