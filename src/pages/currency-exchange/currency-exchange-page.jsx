import CurrencyExchangeCard from '@/components/domain/currency-exchange/currency-exchange-card/currency-exchange-card'
import Footer from '@/components/domain/currency-exchange/footer/footer'

import styles from './currency-exchange-page.module.css'

function CurrencyExchangePage() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>100 EUR to USD - Convert Euros to US Dollars</h1>
      <CurrencyExchangeCard />
      <div className={styles.footer}>
        <Footer />
      </div>
    </section>
  )
}

export default CurrencyExchangePage
