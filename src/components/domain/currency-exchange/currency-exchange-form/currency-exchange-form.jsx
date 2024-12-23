import SwitchIcon from '@icons/switch-icon.svg'

import CustomSelect from '@/components/ui/select/select'
import useCurrenciesOptions from '@/hooks/use-currencies-options'
import useCurrencyExchangeForm from '@/hooks/use-currency-exchange-form'
import useDeviceWidth from '@/hooks/use-device-width'
import { MIN_MOBILE_DEVICE_WIDTH } from '@/lib/utils/enums'

import styles from './currency-exchange-form.module.css'

function CurrencyExchangeForm() {
  const { options, defaultFromValue, defaultToValue } = useCurrenciesOptions()

  const { onSelectChange, onInputChange, errors, values, switchConversionValues } =
    useCurrencyExchangeForm(defaultFromValue, defaultToValue)

  const inputSpacingFromSymbol = values.from?.symbol ? values.from.symbol.length * 0.6 + 1.5 : 1.5
  const { deviceWidth } = useDeviceWidth(0)

  const isMobileDevice = deviceWidth < MIN_MOBILE_DEVICE_WIDTH

  return (
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
  )
}

export default CurrencyExchangeForm
