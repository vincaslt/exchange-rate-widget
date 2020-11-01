import Head from 'next/head';
import ExchangeWidget from '../components/ExchangeWidget/ExchangeWidget';
import { Currency } from '../constants';
import PocketsContainer from '../containers/PocketsContainer';
import RatesContainer from '../containers/RatesContainer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Exchange Rate Widget</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex h-screen bg-gradient-to-b from-blue-50 to-blue-100">
          <RatesContainer.Provider
            initialState={{ baseCurrency: Currency.EUR }}
          >
            <PocketsContainer.Provider
              initialState={{
                pockets: {
                  [Currency.EUR]: { balance: 100, currency: Currency.EUR },
                  [Currency.USD]: { balance: 50, currency: Currency.USD },
                  [Currency.GBP]: { balance: 25, currency: Currency.GBP },
                },
              }}
            >
              <ExchangeWidget
                rounded
                className="w-full h-full sm:w-96 sm:h-96 m-auto shadow-lg"
              />
            </PocketsContainer.Provider>
          </RatesContainer.Provider>
        </div>
      </main>
    </div>
  );
}
