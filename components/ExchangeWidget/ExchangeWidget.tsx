import React, { useCallback, useEffect, useReducer } from 'react';
import { Currency } from '../../constants';
import PocketsContainer from '../../containers/PocketsContainer';
import RatesContainer from '../../containers/RatesContainer';
import { classNames } from '../../utils/classNames';
import useInterval from '../../utils/useInterval';
import AmountInput from '../ui/AmountInput';
import Button from '../ui/Button';
import PocketDropdown from '../ui/PocketDropdown/PocketDropdown';
import ExchangeRate from './ExchangeRate';
import SwitchButton from './SwitchButton';

interface State {
  baseValue?: number;
  targetValue?: number;
  targetCurrency: Currency;
  baseCurrency: Currency;
}

const initialState: State = {
  baseCurrency: Currency.EUR,
  targetCurrency: Currency.USD,
};

type Action =
  | { type: 'base_value_changed'; value?: number; rate: number }
  | { type: 'target_value_changed'; value?: number; rate: number }
  | { type: 'base_currency_changed'; currency: Currency }
  | { type: 'target_currency_changed'; currency: Currency }
  | { type: 'rate_changed'; rate: number }
  | { type: 'clear_values' }
  | { type: 'pockets_switched' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'clear_values':
      return {
        ...state,
        targetValue: undefined,
        baseValue: undefined,
      };
    case 'pockets_switched':
      return {
        ...state,
        baseCurrency: state.targetCurrency,
        targetCurrency: state.baseCurrency,
        baseValue: state.targetValue,
        targetValue: state.baseValue,
      };
    case 'rate_changed':
      return {
        ...state,
        targetValue: state.baseValue
          ? action.rate * state.baseValue
          : state.targetValue,
      };
    case 'base_currency_changed':
      return {
        ...state,
        baseCurrency: action.currency,
        targetCurrency:
          action.currency === state.targetCurrency
            ? state.baseCurrency
            : state.targetCurrency,
      };
    case 'target_currency_changed':
      return {
        ...state,
        targetCurrency: action.currency,
        baseCurrency:
          action.currency === state.baseCurrency
            ? state.targetCurrency
            : state.baseCurrency,
      };
    case 'target_value_changed':
      return {
        ...state,
        targetValue: action.value,
        baseValue: action.value && action.value / action.rate,
      };
    case 'base_value_changed':
      return {
        ...state,
        baseValue: action.value,
        targetValue: action.value && action.value * action.rate,
      };
    default:
      throw new Error('Unknown action received');
  }
}

interface Props {
  rounded?: boolean;
  className?: string;
}

export default function ExchangeWidget({ className, rounded }: Props) {
  const { allRates, fetchExchangeRates } = RatesContainer.useContainer();
  const { pockets, exchange } = PocketsContainer.useContainer();
  const [state, dispatch] = useReducer(reducer, initialState);

  const baseCurrencyRates = allRates[state.baseCurrency];
  const targetRate = baseCurrencyRates?.rates[state.targetCurrency];
  const isInsufficient =
    !!state.baseValue &&
    pockets[state.baseCurrency].balance - state.baseValue < 0;

  const refreshExchangeRates = useCallback(() => {
    fetchExchangeRates(state.baseCurrency);
  }, [fetchExchangeRates, state.baseCurrency]);

  useInterval(refreshExchangeRates, 10000);

  useEffect(() => {
    refreshExchangeRates();
  }, [refreshExchangeRates]);

  useEffect(() => {
    if (targetRate) {
      dispatch({ type: 'rate_changed', rate: targetRate });
    }
  }, [targetRate]);

  const handleSwitchCurrency = () => {
    dispatch({ type: 'pockets_switched' });
  };

  const handleExchange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInsufficient && state.baseValue) {
      exchange(state.baseCurrency, state.targetCurrency, state.baseValue);
      dispatch({ type: 'clear_values' });
    }
  };

  const handleChangeBaseCurrency = (currency: Currency) => {
    dispatch({ type: 'base_currency_changed', currency });
  };

  const handleChangeTargetCurrency = (currency: Currency) => {
    dispatch({ type: 'target_currency_changed', currency });
  };

  const handleChangeBaseValue = (value?: number) => {
    if (targetRate) {
      dispatch({ type: 'base_value_changed', value, rate: targetRate });
    }
  };

  const handleChangeTargetValue = (value?: number) => {
    if (targetRate) {
      dispatch({ type: 'target_value_changed', value, rate: targetRate });
    }
  };

  return (
    <form
      onSubmit={handleExchange}
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
            selected={state.baseCurrency}
            onChange={handleChangeBaseCurrency}
            insufficient={isInsufficient}
          />
        </div>
        <AmountInput
          value={state.baseValue}
          onChange={handleChangeBaseValue}
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
          <SwitchButton onClick={handleSwitchCurrency} />
          {baseCurrencyRates && targetRate && (
            <ExchangeRate
              rate={targetRate}
              base={baseCurrencyRates.base}
              target={state.targetCurrency}
            />
          )}
        </div>
        <div className="flex flex-grow px-3 pt-6">
          <div className="flex flex-shrink-0">
            <PocketDropdown
              pockets={pockets}
              selected={state.targetCurrency}
              onChange={handleChangeTargetCurrency}
            />
          </div>
          <AmountInput
            value={state.targetValue}
            onChange={handleChangeTargetValue}
            prefix="+"
          />
        </div>

        <Button
          type="submit"
          disabled={isInsufficient}
          data-test-id="button-exchange"
        >
          Exchange
        </Button>
      </div>
    </form>
  );
}
