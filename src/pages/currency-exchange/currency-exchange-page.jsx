import CurrencyExchangeCard from '@/components/domain/currency-exchange/currency-exchange-card/currency-exchange-card'
import Footer from '@/components/domain/currency-exchange/footer/footer'
import useCurrenciesOptions from '@/hooks/use-currencies-options'
import useCurrencyExchangeForm from '@/hooks/use-currency-exchange-form'

import styles from './currency-exchange-page.module.css'

function CurrencyExchangePage() {
  const { options, defaultFromValue, defaultToValue } = useCurrenciesOptions()

  const { onSelectChange, onInputChange, errors, values, switchConversionValues, exchangeResult } =
    useCurrencyExchangeForm(defaultFromValue, defaultToValue)

  const { date, fromCurrency, fromLabel, toCurrency, toLabel } = exchangeResult

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>100 EUR to USD - Convert Euros to US Dollars</h1>
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
