import CurrencyExchangeCard from '@/components/domain/currency-exchange/currency-exchange-card/currency-exchange-card'
import Footer from '@/components/domain/currency-exchange/footer/footer'
import useCurrenciesOptions from '@/hooks/use-currencies-options'
import useCurrencyExchange from '@/hooks/use-currency-exchange'
import useCurrencyExchangeForm from '@/hooks/use-currency-exchange-form'

import styles from './currency-exchange-page.module.css'

function CurrencyExchangePage() {
  const { options, defaultFromValue, defaultToValue } = useCurrenciesOptions()

  const { onSelectChange, onInputChange, errors, values, switchConversionValues } =
    useCurrencyExchangeForm(defaultFromValue, defaultToValue)

  const { fromCurrency, fromLabel, toCurrency, toLabel, amount } = useCurrencyExchange()

  const titleText = `${amount} ${fromLabel} to ${toLabel} - Convert ${fromCurrency} to ${toCurrency}`

  return (
    <section className={styles.container}>
      <div className={styles['title-container']}>
        <h1 className={styles.title}>{titleText}</h1>
      </div>
      <CurrencyExchangeCard
        errors={errors}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
        options={options}
        switchConversionValues={switchConversionValues}
        values={values}
      />
      <div className={styles.footer}>
        <Footer />
      </div>
    </section>
  )
}

export default CurrencyExchangePage
