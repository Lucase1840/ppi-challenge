import CurrencyExchangeCard from '@/components/domain/currency-exchange/currency-exchange-card/currency-exchange-card'
import Footer from '@/components/domain/currency-exchange/footer/footer'
import useCurrenciesOptions from '@/hooks/use-currencies-options'
import useCurrencyExchangeForm from '@/hooks/use-currency-exchange-form'

import styles from './currency-exchange-page.module.css'

function CurrencyExchangePage() {
  const { options, defaultFromValue, defaultToValue } = useCurrenciesOptions()

  const { onSelectChange, onInputChange, errors, values, switchConversionValues, exchangeResult } =
    useCurrencyExchangeForm(defaultFromValue, defaultToValue)

  const { date, fromCurrency, fromLabel, toCurrency, toLabel, amount } = exchangeResult

  const title = Object.keys(exchangeResult).length
    ? `${amount} ${fromLabel} to ${toLabel} - Convert ${fromCurrency} to ${toCurrency}`
    : '1.00 US Dollar to Euro - Convert USD to EUR'

  return (
    <section className={styles.container}>
      <div className={styles['title-container']}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <CurrencyExchangeCard
        errors={errors}
        exchangeResult={exchangeResult}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
        options={options}
        switchConversionValues={switchConversionValues}
        values={values}
      />
      <div className={styles.footer}>
        <Footer
          date={date}
          fromCurrency={fromCurrency}
          fromLabel={fromLabel}
          toCurrency={toCurrency}
          toLabel={toLabel}
        />
      </div>
    </section>
  )
}

export default CurrencyExchangePage
