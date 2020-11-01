import axios from 'axios';
import { Currency } from '../constants';
import { RatesData } from '../interfaces/rates';

export const fetchRatesData = (base: Currency) =>
  axios
    .get<RatesData>(`https://api.exchangeratesapi.io/latest`, {
      params: {
        base,
        symbols: ['USD', 'GBP', 'EUR'],
      },
    })
    .then(({ data }) => data);
