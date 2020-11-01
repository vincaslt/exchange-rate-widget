import { useCallback, useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import { fetchRatesData } from '../api/rates';
import { Currency } from '../constants';
import { Rates } from '../interfaces/rates';

export interface InitialRatesData {
  allRates: Rates;
  baseCurrency: Currency;
}

// TODO: query after switch immediately
function useRates(initialState: InitialRatesData) {
  const [allRates, setAllRates] = useState<Rates>(initialState.allRates);
  const [baseCurrency, setBaseCurrency] = useState(initialState.baseCurrency);

  const baseCurrencyRates = useMemo(() => allRates[baseCurrency], [
    baseCurrency,
    allRates,
  ]);

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

  useEffect(() => {
    if (baseCurrencyRates) {
      const interval = setInterval(
        () => fetchExchangeRates(baseCurrency),
        10000
      );
      return () => clearInterval(interval);
    }

    fetchExchangeRates(baseCurrency);
  }, [baseCurrency, baseCurrencyRates, fetchExchangeRates]);

  return {
    baseCurrency,
    setBaseCurrency,
    baseCurrencyRates,
    getRatesForCurrency,
  };
}

const RatesContainer = createContainer(useRates);

export default RatesContainer;
