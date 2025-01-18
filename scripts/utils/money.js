// scripts for code related to money

export function formatCurrency(priceCents) { // converts from cents to dollars rounded to 2 decimal places
  return (priceCents / 100).toFixed(2);
}

export default formatCurrency;