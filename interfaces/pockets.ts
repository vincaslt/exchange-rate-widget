import { Currency } from '../constants';

export interface Pocket {
  currency: Currency;
  balance: number;
}

export type Pockets = {
  [currency in Currency]: Pocket;
};
