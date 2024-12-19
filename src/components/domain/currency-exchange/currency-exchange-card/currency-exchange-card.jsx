import SwitchIcon from '@icons/switch-icon.svg'

import CustomSelect from '@/components/ui/select/select'
import useCurrencies from '@/hooks/use-currencies'

import Footer from '../footer/footer'

import styles from './currency-exchange-card.module.css'

function CurrencyExchangeCard() {
  const isDesktop = false
  const { options } = useCurrencies()

  return (
    <section className={styles['card-container']}>
      <form className={styles['form-container']}>
        <div className={styles['input-container']}>
          <label htmlFor='amount'>Amount</label>
          <div className={styles['input-container']}>
            <span className={styles['currency-symbol']}>$</span>
            <input className={styles.input} name='amount' type='text' />
          </div>
        </div>
        <div className={styles['select-container']}>
          <label htmlFor='from'>From</label>
          <CustomSelect name='from' options={options} />
        </div>
        <button className={styles.button} type='button'>
          <img alt='switch-icon' src={SwitchIcon} />
        </button>
        <div className={styles['select-container']}>
          <label htmlFor='to'>To</label>
          <CustomSelect name='to' options={options} />
        </div>
      </form>
      <div className={styles.info}>
        <p className={styles['main-info']}>1.00 Euro = 1.0627478 US Dollars</p>
        <p className={styles['secondary-info']}>1 USD = 0.941004 EUR</p>
      </div>
      {isDesktop && (
        <div>
          <p>INFORMACIÓN ADICIONAL EN CELESTE</p>
          <Footer />
        </div>
      )}
    </section>
  )
}

export default CurrencyExchangeCard