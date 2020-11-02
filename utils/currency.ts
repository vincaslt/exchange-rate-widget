import { Currency } from '../constants';

export const formatCurrency = (
  amount: number,
  currency: Currency,
  fixed = false
) => {
  return new Intl.NumberFormat(
    (typeof navigator !== 'undefined' && navigator.languages[0]) || 'en-UK',
    {
      style: 'currency',
      currency,
      minimumFractionDigits: fixed ? 2 : 0,
      maximumFractionDigits: fixed ? 2 : 4,
    }
  ).format(amount);
};
