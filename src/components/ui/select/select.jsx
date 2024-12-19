import React from 'react'
import Select, { components } from 'react-select'
import ArrowIcon from '@icons/select-arrow-icon.svg'

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={ArrowIcon} alt='arrow-icon' />
    </components.DropdownIndicator>
  )
}

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: '2.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(26, 143, 255, 0.45)' : '',
    border: state.isFocused ? '1px solid #1a8dff' : '',
  }),
}

function CustomSelect(props) {
  return (
    <Select
      {...props}
      components={{ DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator: () => null }}
      classNamePrefix='react-select'
      styles={customStyles}
    />
  )
}

export default CustomSelect
