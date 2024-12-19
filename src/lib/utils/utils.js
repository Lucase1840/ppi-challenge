export const currencySelectOptionsAdapter = (options) => {
  return Object.entries(options).reduce((acc, [key, value]) => {
    acc.push({
      symbol: value.symbol,
      value: key,
      label: value.name,
    })

    return acc
  }, [])
}
