import SwitchIcon from '@icons/switch-icon.svg'

import CustomSelect from '@/components/ui/select/select'
import useCurrencyExchange from '@/hooks/use-currency-exchange'

import Footer from '../footer/footer'

import styles from './currency-exchange-card.module.css'

function CurrencyExchangeCard({
  onSelectChange,
  onInputChange,
  errors,
  values,
  switchConversionValues,
  options,
  isMobileDevice,
}) {
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

  const inputSpacingFromSymbol = values.from?.symbol ? values.from.symbol.length * 0.6 + 1.5 : 1.5

  return (
    <section className={styles['card-container']}>
      <div className={styles['card-content']}>
        <div>
          <form className={styles['form-container']}>
            <div>
              <div className={styles['input-container']}>
                <label htmlFor='amount'>Amount</label>
                <div className={styles['input-container']}>
                  <span className={styles['currency-symbol']}>{values.from?.symbol}</span>
                  <input
                    className={styles.input}
                    id='amount'
                    name='amount'
                    onChange={onInputChange}
                    style={{
                      padding: `0.5rem 1rem 0.5rem ${inputSpacingFromSymbol}rem`,
                    }}
                    type='text'
                    value={values.amount}
                  />
                </div>
              </div>
              {isMobileDevice && Boolean(errors.amount) ? (
                <p className={styles.error}>{errors.amount}</p>
              ) : null}
            </div>

            <div className={styles['select-container']}>
              <label htmlFor='from'>From</label>
              <CustomSelect
                inputId='from'
                name='from'
                onChange={(values, { name }) => onSelectChange(values, name)}
                options={options}
                value={values.from}
              />
            </div>
            <button
              aria-label='Invert selected currency'
              className={styles.button}
              onClick={switchConversionValues}
              type='button'
            >
              <img alt='switch-icon' src={SwitchIcon} />
            </button>
            <div className={styles['select-container']}>
              <label htmlFor='to'>To</label>
              <CustomSelect
                inputId='to'
                name='to'
                onChange={(values, { name }) => onSelectChange(values, name)}
                options={options}
                value={values.to}
              />
            </div>
          </form>
          {!isMobileDevice && Boolean(errors.amount) ? (
            <p className={styles.error}>{errors.amount}</p>
          ) : null}
        </div>
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
