import React, { useCallback, useEffect } from 'react';
import { Currency } from '../../constants';
import { Pockets } from '../../interfaces/pockets';
import { classNames } from '../../utils/classNames';
import useInterval from '../../utils/useInterval';
import AmountInput from '../ui/AmountInput';
import Button from '../ui/Button';
import PocketDropdown from '../ui/PocketDropdown/PocketDropdown';
import ExchangeRate from './ExchangeRate';
import SwitchButton from './SwitchButton';

export interface Props {
  pockets: Pockets;
  rate?: number;
  insufficientBalance?: boolean;
  baseValue?: number;
  targetValue?: number;
  targetCurrency: Currency;
  baseCurrency: Currency;
  fetchExchangeRates: (currency: Currency) => void;
  onChangeBaseCurrency: (currency: Currency) => void;
  onChangeTargetCurrency: (currency: Currency) => void;
  onChangeBaseValue: (value?: number) => void;
  onChangeTargetValue: (value?: number) => void;
  onSwitchCurrency: () => void;
  onExchange: () => void;
  rounded?: boolean;
  className?: string;
}

export default function ExchangeWidget({
  rate,
  pockets,
  baseCurrency,
  onSwitchCurrency,
  onExchange,
  targetCurrency,
  baseValue,
  targetValue,
  fetchExchangeRates,
  onChangeBaseCurrency,
  onChangeTargetCurrency,
  onChangeBaseValue,
  onChangeTargetValue,
  insufficientBalance,
  className,
  rounded,
}: Props) {
  const refreshExchangeRates = useCallback(() => {
    fetchExchangeRates(baseCurrency);
  }, [fetchExchangeRates, baseCurrency]);

  useInterval(refreshExchangeRates, 10000);

  useEffect(() => {
    refreshExchangeRates();
  }, [refreshExchangeRates]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onExchange();
      }}
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
            onChange={onChangeBaseCurrency}
            insufficient={insufficientBalance}
          />
        </div>
        <AmountInput
          value={baseValue}
          onChange={onChangeBaseValue}
          prefix="-"
        />
      </div>
      <div
        className={classNames(
          'flex flex-col relative bg-gray-50 flex-grow',
          rounded && 'rounded-b-lg'
        )}
      >
        <div className="px-3 w-full flex items-center justify-between absolute top-0 transform -translate-y-1/2">
          <SwitchButton onClick={onSwitchCurrency} />
          {rate && (
            <ExchangeRate
              rate={rate}
              base={baseCurrency}
              target={targetCurrency}
            />
          )}
        </div>
        <div className="flex flex-grow px-3 pt-6">
          <div className="flex flex-shrink-0">
            <PocketDropdown
              pockets={pockets}
              selected={targetCurrency}
              onChange={onChangeTargetCurrency}
            />
          </div>
          <AmountInput
            value={targetValue}
            onChange={onChangeTargetValue}
            prefix="+"
          />
        </div>

        <Button
          type="submit"
          disabled={insufficientBalance}
          data-test-id="button-exchange"
        >
          Exchange
        </Button>
      </div>
    </form>
  );
}
