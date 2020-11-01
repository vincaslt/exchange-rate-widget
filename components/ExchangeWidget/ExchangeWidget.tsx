import React, { useState } from 'react';
import { Currency } from '../../constants';
import RatesContainer from '../../containers/RatesContainer';
import { classNames } from '../../utils/classNames';
import PocketDropdown, { Pocket } from '../ui/PocketDropdown';
import ExchangeRate from './ExchangeRate';
import SwitchButton from './SwitchButton';

interface Props {
  rounded?: boolean;
  className?: string;
}

const pockets: Pocket[] = [
  {
    id: 'eur',
    balance: 100,
    name: 'EUR',
  },
  {
    id: 'usd',
    balance: 50,
    name: 'USD',
  },
  {
    id: 'gbp',
    balance: 25,
    name: 'GBP',
  },
];

// TODO: server-side render rates
export default function ExchangeWidget({ className, rounded }: Props) {
  const { rates } = RatesContainer.useContainer();
  const [activePocket, setActivePocket] = useState('eur');

  console.log({ rates });

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
            selected={activePocket}
            onChange={setActivePocket}
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
          <SwitchButton />
          {rates && (
            <ExchangeRate
              base={rates.base}
              rate={rates.rates[Currency.USD]}
              target={Currency.USD}
            />
          )}
        </div>
        <div className="flex flex-grow px-3 pt-6">
          <div className="flex flex-shrink-0">
            <PocketDropdown
              pockets={pockets}
              selected={activePocket}
              onChange={setActivePocket}
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
