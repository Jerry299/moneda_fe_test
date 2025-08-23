export const formatMoney = (money: number) => {
  const format = new Intl.NumberFormat('en', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(money)

  return `$${format}`
}

export const formatNumber = (number: any = 0, min: number = 2, max: number = 2) => {
  return parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  })
}
