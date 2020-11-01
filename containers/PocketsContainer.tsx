import { useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Currency } from '../constants';
import { Pocket } from '../interfaces/pockets';
import RatesContainer from './RatesContainer';

type Pockets = {
  [currency in Currency]: Pocket;
};

function usePockets(initialState: { pockets: Pockets }) {
  const { getRatesForCurrency } = RatesContainer.useContainer();
  const [pockets, setPockets] = useState(initialState.pockets);

  // TODO: validate balance
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