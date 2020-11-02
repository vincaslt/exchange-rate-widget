import React from 'react';
import StatelessExchangeWidget, { Props } from './ExchangeWidget';
import useExchangeWidget from './useExchangeWidget';

export default function ExchangeWidget(
  props: Pick<Props, 'className' | 'rounded'>
) {
  const {
    fetchExchangeRates,
    handleChangeBaseCurrency,
    handleChangeBaseValue,
    handleChangeTargetCurrency,
    handleChangeTargetValue,
    handleExchange,
    handleSwitchCurrency,
    pockets,
    baseCurrency,
    targetCurrency,
    baseValue,
    targetValue,
    insufficientBalance,
    targetRate,
  } = useExchangeWidget();

  return (
    <StatelessExchangeWidget
      {...props}
      rate={targetRate}
      pockets={pockets}
      baseValue={baseValue}
      targetValue={targetValue}
      baseCurrency={baseCurrency}
      targetCurrency={targetCurrency}
      insufficientBalance={insufficientBalance}
      fetchExchangeRates={fetchExchangeRates}
      onChangeBaseCurrency={handleChangeBaseCurrency}
      onChangeBaseValue={handleChangeBaseValue}
      onChangeTargetCurrency={handleChangeTargetCurrency}
      onChangeTargetValue={handleChangeTargetValue}
      onSwitchCurrency={handleSwitchCurrency}
      onExchange={handleExchange}
    />
  );
}
