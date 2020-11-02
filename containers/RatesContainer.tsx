import { useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';
import { fetchRatesData } from '../api/rates';
import { Currency } from '../constants';
import { Rates } from '../interfaces/rates';

function useRates(initialState?: Rates) {
  const [allRates, setAllRates] = useState<Rates>(initialState ?? {});

  const fetchExchangeRates = useCallback(async (currency: Currency) => {
    const exchangeRates = await fetchRatesData(currency);
    setAllRates((rates) => ({
      ...rates,
      [currency]: exchangeRates,
    }));
    return exchangeRates;
  }, []);

  const getRatesForCurrency = useCallback(
    async (baseCurrency: Currency) =>
      allRates[baseCurrency] || (await fetchExchangeRates(baseCurrency)),
    [allRates, fetchExchangeRates]
  );

  return {
    allRates,
    getRatesForCurrency,
    fetchExchangeRates,
  };
}

const RatesContainer = createContainer(useRates);

export default RatesContainer;
