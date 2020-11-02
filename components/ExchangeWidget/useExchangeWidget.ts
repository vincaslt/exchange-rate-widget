import { useEffect, useReducer } from 'react';
import { Currency } from '../../constants';
import PocketsContainer from '../../containers/PocketsContainer';
import RatesContainer from '../../containers/RatesContainer';

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

export default function useExchangeWidget() {
  const { allRates, fetchExchangeRates } = RatesContainer.useContainer();
  const { pockets, exchange } = PocketsContainer.useContainer();
  const [state, dispatch] = useReducer(reducer, initialState);

  const targetRate = allRates[state.baseCurrency]?.rates[state.targetCurrency];
  const insufficientBalance =
    !!state.baseValue &&
    pockets[state.baseCurrency].balance - state.baseValue < 0;

  useEffect(() => {
    if (targetRate) {
      dispatch({ type: 'rate_changed', rate: targetRate });
    }
  }, [targetRate]);

  const handleSwitchCurrency = () => {
    dispatch({ type: 'pockets_switched' });
  };

  const handleExchange = () => {
    if (!insufficientBalance && state.baseValue) {
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

  return {
    ...state,
    targetRate,
    pockets,
    fetchExchangeRates,
    handleSwitchCurrency,
    handleExchange,
    handleChangeBaseCurrency,
    handleChangeTargetCurrency,
    handleChangeBaseValue,
    handleChangeTargetValue,
    insufficientBalance,
  };
}
