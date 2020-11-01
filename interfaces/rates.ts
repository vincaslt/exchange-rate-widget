import { Currency } from '../constants';

export interface RatesData {
  date: string;
  base: Currency;
  rates: {
    [currency in Currency]: number;
  };
}

export type Rates = Partial<
  {
    [currency in Currency]: RatesData;
  }
>;
