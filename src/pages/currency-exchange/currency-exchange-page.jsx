import CurrencyExchangeCard from '@/components/domain/currency-exchange/currency-exchange-card/currency-exchange-card'
import Footer from '@/components/domain/currency-exchange/footer/footer'
import useCurrencyExchange from '@/hooks/use-currency-exchange'
import useDeviceWidth from '@/hooks/use-device-width'
import { MIN_MOBILE_DEVICE_WIDTH } from '@/lib/utils/enums'

import styles from './currency-exchange-page.module.css'

function CurrencyExchangePage() {
  const { fromCurrency, fromLabel, toCurrency, toLabel, amount } = useCurrencyExchange()
  const { deviceWidth } = useDeviceWidth(0)

  const titleText = `${amount} ${fromLabel} to ${toLabel} - Convert ${fromCurrency} to ${toCurrency}`

  const isMobileDevice = deviceWidth < MIN_MOBILE_DEVICE_WIDTH

  return (
    <section aria-labelledby='page-title' className={styles.container}>
      <div className={styles['title-container']}>
        <h2 className={styles.title} id='page-title'>
          {titleText}
        </h2>
      </div>
      <CurrencyExchangeCard isMobileDevice={isMobileDevice} />
      {isMobileDevice ? (
        <div className={styles.footer}>
          <Footer />
        </div>
      ) : null}
    </section>
  )
}

export default CurrencyExchangePage
