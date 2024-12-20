import SwitchIcon from '@icons/switch-icon.svg'

import CustomSelect from '@/components/ui/select/select'

import Footer from '../footer/footer'

import styles from './currency-exchange-card.module.css'

function CurrencyExchangeCard({
  onSelectChange,
  onInputChange,
  errors,
  values,
  switchConversionValues,
  exchangeResult,
  options,
}) {
  const {
    amount,
    date,
    fromCurrency,
    fromCurrencyRate,
    fromLabel,
    toCurrency,
    toCurrencyRate,
    toLabel,
  } = exchangeResult

  const isDesktop = false

  const inputSpacingFromSymbol = values.from ? values.from?.symbol?.length * 0.6 + 1.5 : 1.5

  return (
    <section className={styles['card-container']}>
      <form className={styles['form-container']}>
        <div>
          <div className={styles['input-container']}>
            <label htmlFor='amount'>Amount</label>
            <div className={styles['input-container']}>
              <span className={styles['currency-symbol']}>{values.from?.symbol}</span>
              <input
                className={styles.input}
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
          {Boolean(errors.amount) && <p className={styles.error}>{errors.amount}</p>}
        </div>
        <div className={styles['select-container']}>
          <label htmlFor='from'>From</label>
          <CustomSelect
            name='from'
            onChange={(values, { name }) => onSelectChange(values, name)}
            options={options}
            value={values.from}
          />
        </div>
        <button className={styles.button} onClick={switchConversionValues} type='button'>
          <img alt='switch-icon' src={SwitchIcon} />
        </button>
        <div className={styles['select-container']}>
          <label htmlFor='to'>To</label>
          <CustomSelect
            name='to'
            onChange={(values, { name }) => onSelectChange(values, name)}
            options={options}
            value={values.to}
          />
        </div>
      </form>
      {Object.keys(exchangeResult).length ? (
        <div className={styles.info}>
          <p
            className={styles['main-info']}
          >{`${amount?.toString()} ${fromLabel}${amount > 1 ? 's' : ''} = ${toCurrencyRate} ${toLabel}`}</p>
          <p
            className={styles['secondary-info']}
          >{`${amount?.toString()} ${fromCurrency} = ${fromCurrencyRate} ${toCurrency}`}</p>
        </div>
      ) : null}
      {isDesktop && (
        <div>
          <p>INFORMACIÓN ADICIONAL EN CELESTE</p>
          <Footer
            date={date}
            fromCurrency={fromCurrency}
            fromLabel={fromLabel}
            toCurrency={toCurrency}
            toLabel={toLabel}
          />
        </div>
      )}
    </section>
  )
}

export default CurrencyExchangeCard
