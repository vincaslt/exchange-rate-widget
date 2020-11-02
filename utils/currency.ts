import { Currency } from '../constants';

export const formatCurrency = (amount: number, currency: Currency) => {
  return new Intl.NumberFormat(
    (typeof navigator !== 'undefined' && navigator.languages[0]) || 'en-UK',
    {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    }
  ).format(amount);
};
