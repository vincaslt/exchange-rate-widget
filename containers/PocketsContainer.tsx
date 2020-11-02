import { useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Currency } from '../constants';
import { Pockets } from '../interfaces/pockets';
import RatesContainer from './RatesContainer';

function usePockets(initialState?: Pockets) {
  const { getRatesForCurrency } = RatesContainer.useContainer();
  const [pockets, setPockets] = useState(
    initialState ?? {
      [Currency.EUR]: { balance: 0, currency: Currency.EUR },
      [Currency.USD]: { balance: 0, currency: Currency.USD },
      [Currency.GBP]: { balance: 0, currency: Currency.GBP },
    }
  );

  const exchange = useCallback(
    async (from: Currency, to: Currency, amount: number) => {
      const { rates } = await getRatesForCurrency(from);
      setPockets((pockets) => ({
        ...pockets,
        [from]: {
          ...pockets[from],
          balance: pockets[from].balance - amount,
        },
        [to]: {
          ...pockets[to],
          balance: pockets[to].balance + amount * rates[to],
        },
      }));
    },
    [getRatesForCurrency]
  );

  return { pockets, exchange };
}

const PocketsContainer = createContainer(usePockets);

export default PocketsContainer;
