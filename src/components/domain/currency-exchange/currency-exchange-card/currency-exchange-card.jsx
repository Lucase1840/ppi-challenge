import useCurrencyExchange from '@/hooks/use-currency-exchange'

import CurrencyExchangeForm from '../currency-exchange-form/currency-exchange-form'
import Footer from '../footer/footer'

import styles from './currency-exchange-card.module.css'

function CurrencyExchangeCard({ isMobileDevice }) {
  const {
    date,
    fromCurrency,
    fromLabel,
    toCurrency,
    toLabel,
    amount,
    currencyExchangeResult,
    invertedCurrencyExchangeResult,
  } = useCurrencyExchange()

  return (
    <section className={styles['card-container']}>
      <div className={styles['card-content']}>
        <CurrencyExchangeForm />
        <div className={styles['main-card-content']}>
          <div className={styles['results-container']}>
            <p
              className={styles['primary-result']}
            >{`${amount?.toString()} ${fromLabel}${amount > 1 ? 's' : ''} = ${currencyExchangeResult} ${toLabel}${currencyExchangeResult > 1 ? 's' : ''}`}</p>
            <p
              className={styles['secondary-result']}
            >{`${amount?.toString()} ${toCurrency} = ${invertedCurrencyExchangeResult} ${fromCurrency}`}</p>
          </div>
          {!isMobileDevice ? (
            <div className={styles['information-container']}>
              <p className={styles['information']}>
                We use the mid-market rate for our Converter. This is for informational purposes
                only. You won’t receive this rate when sending money.
              </p>
            </div>
          ) : null}
        </div>
      </div>
      {!isMobileDevice ? (
        <div className={styles.footer}>
          <Footer
            date={date}
            fromCurrency={fromCurrency}
            fromLabel={fromLabel}
            toCurrency={toCurrency}
            toLabel={toLabel}
          />
        </div>
      ) : null}
    </section>
  )
}

export default CurrencyExchangeCard
