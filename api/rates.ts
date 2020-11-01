import axios from 'axios';
import { Currency } from '../constants';
import { fromRatesDataDTO, RatesDataDTO } from '../interfaces/rates';

export const fetchRatesData = (base: Currency) =>
  axios
    .get<RatesDataDTO>(`https://api.exchangeratesapi.io/latest`, {
      params: {
        base,
        symbols: ['USD', 'GBP', 'EUR'],
      },
    })
    .then(({ data }) => data)
    .then(fromRatesDataDTO);
