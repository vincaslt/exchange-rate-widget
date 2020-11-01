import React, { useState } from 'react';
import { Currency } from '../../constants';
import PocketsContainer from '../../containers/PocketsContainer';
import RatesContainer from '../../containers/RatesContainer';
import { classNames } from '../../utils/classNames';
import PocketDropdown from '../ui/PocketDropdown';
import ExchangeRate from './ExchangeRate';
import SwitchButton from './SwitchButton';

interface Props {
  rounded?: boolean;
  className?: string;
}

export default function ExchangeWidget({ className, rounded }: Props) {
  const {
    baseCurrencyRates,
    baseCurrency,
    setBaseCurrency,
  } = RatesContainer.useContainer();
  const { pockets } = PocketsContainer.useContainer();
  const [targetCurrency, setTargetCurrency] = useState(Currency.GBP);

  const handleSwitchPocket = () => {
    setTargetCurrency(baseCurrency);
    setBaseCurrency(targetCurrency);
  };

  return (
    <div
      className={classNames(
        'bg-white flex flex-col',
        rounded && 'rounded-lg',
        className
      )}
    >
      <div className="flex flex-grow px-3 py-6">
        <div className="flex flex-shrink-0">
          <PocketDropdown
            pockets={pockets}
            selected={baseCurrency}
            onChange={setBaseCurrency}
          />
        </div>
        <input
          type="number"
          value="0"
          className="flex w-full text-right text-xl h-20 bg-transparent outline-none text-gray-400"
        />
      </div>
      <div
        className={classNames(
          'flex flex-col relative bg-gray-50 flex-grow',
          rounded && 'rounded-b-lg'
        )}
      >
        <div className="px-3 w-full flex items-center justify-between absolute top-0 transform -translate-y-1/2">
          <SwitchButton onClick={handleSwitchPocket} />
          <ExchangeRate
            base={baseCurrencyRates.base}
            rate={baseCurrencyRates.rates[targetCurrency]}
            target={targetCurrency}
          />
        </div>
        <div className="flex flex-grow px-3 pt-6">
          <div className="flex flex-shrink-0">
            <PocketDropdown
              pockets={pockets}
              selected={targetCurrency}
              onChange={setTargetCurrency}
            />
          </div>
          <input
            type="number"
            className="flex w-full text-right text-xl h-20 bg-transparent outline-none text-gray-400"
          />
        </div>

        <button
          type="button"
          className="m-3 bg-blue rounded-lg px-4 py-2 font-medium leading-6 bg-blue-600 text-white shadow hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue text-center"
        >
          Exchange
        </button>
      </div>
    </div>
  );
}
