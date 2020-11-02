import { render } from '@testing-library/react';
import { Currency } from '../../constants';
import ExchangeWidget from './ExchangeWidget';

describe('ExchangeWidget', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should refresh exchange rate every 10 seconds', () => {
    const fetchMock = jest.fn();

    render(
      <ExchangeWidget
        rate={0.7}
        baseCurrency={Currency.GBP}
        targetCurrency={Currency.USD}
        fetchExchangeRates={fetchMock}
        pockets={{
          [Currency.EUR]: { balance: 500, currency: Currency.EUR },
          [Currency.USD]: { balance: 500, currency: Currency.USD },
          [Currency.GBP]: { balance: 500, currency: Currency.GBP },
        }}
        onChangeBaseCurrency={jest.fn()}
        onChangeBaseValue={jest.fn()}
        onChangeTargetCurrency={jest.fn()}
        onChangeTargetValue={jest.fn()}
        onSwitchCurrency={jest.fn()}
        onExchange={jest.fn()}
      />
    );

    jest.advanceTimersByTime(20000);

    // Initial + x2 every 10 seconds
    expect(fetchMock).toBeCalledTimes(3);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
