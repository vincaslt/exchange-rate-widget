import { useCallback, useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import { fetchRatesData } from '../api/rates';
import { Currency } from '../constants';
import { RatesData } from '../interfaces/rates';

type Rates = Partial<
  {
    [currency in Currency]: RatesData;
  }
>;

// TODO: poll all exchange rates
function useRates(initialState: { baseCurrency: Currency }) {
  const [baseCurrency, setBaseCurrency] = useState(initialState.baseCurrency);
  const [allRates, setAllRates] = useState<Rates>({});

  const rates = useMemo(() => allRates[baseCurrency], [baseCurrency, allRates]);

  const getExchangeRates = useCallback(async (baseCurrency: Currency) => {
    const exchangeRates = await fetchRatesData(baseCurrency);
    setAllRates((rates) => ({
      ...rates,
      [baseCurrency]: exchangeRates,
    }));
    return exchangeRates;
  }, []);

  const getRatesForCurrency = async (baseCurrency: Currency) => {
    return allRates[baseCurrency] || (await getExchangeRates(baseCurrency));
  };

  useEffect(() => {
    getExchangeRates(baseCurrency);
  }, [getExchangeRates, baseCurrency]);

  // useEffect(() => {
  //   if (rates) {
  //     const interval = setInterval(() => getExchangeRates(baseCurrency), 10000);

  //     return () => clearInterval(interval);
  //   }

  //   getExchangeRates();
  // }, [rates, getExchangeRates]);

  return { rates, setBaseCurrency, getRatesForCurrency };
}

const RatesContainer = createContainer(useRates);

export default RatesContainer;
