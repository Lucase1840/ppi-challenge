import CurrencyExchangeCard from '@/components/domain/currency-exchange/currency-exchange-card/currency-exchange-card'
import Footer from '@/components/domain/currency-exchange/footer/footer'
import useCurrenciesOptions from '@/hooks/use-currencies-options'
import useCurrencyExchange from '@/hooks/use-currency-exchange'
import useCurrencyExchangeForm from '@/hooks/use-currency-exchange-form'
import useDeviceWidth from '@/hooks/use-device-width'
import { MIN_MOBILE_DEVICE_WIDTH } from '@/lib/utils/enums'

import styles from './currency-exchange-page.module.css'

function CurrencyExchangePage() {
  const { options, defaultFromValue, defaultToValue } = useCurrenciesOptions()

  const { onSelectChange, onInputChange, errors, values, switchConversionValues } =
    useCurrencyExchangeForm(defaultFromValue, defaultToValue)

  const { fromCurrency, fromLabel, toCurrency, toLabel, amount } = useCurrencyExchange()
  const { deviceWidth } = useDeviceWidth(0)

  const titleText = `${amount} ${fromLabel} to ${toLabel} - Convert ${fromCurrency} to ${toCurrency}`

  const isMobileDevice = deviceWidth < MIN_MOBILE_DEVICE_WIDTH

  return (
    <section className={styles.container}>
      <div className={styles['title-container']}>
        <h1 className={styles.title}>{titleText}</h1>
      </div>
      <CurrencyExchangeCard
        errors={errors}
        isMobileDevice={isMobileDevice}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
        options={options}
        switchConversionValues={switchConversionValues}
        values={values}
      />
      {isMobileDevice ? (
        <div className={styles.footer}>
          <Footer />
        </div>
      ) : null}
    </section>
  )
}

export default CurrencyExchangePage
