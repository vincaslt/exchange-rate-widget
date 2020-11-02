import Head from 'next/head';
import { fetchRatesData } from '../api/rates';
import ExchangeWidget from '../components/ExchangeWidget/ExchangeWidget';
import { Currency } from '../constants';
import PocketsContainer from '../containers/PocketsContainer';
import RatesContainer from '../containers/RatesContainer';
import { Pockets } from '../interfaces/pockets';
import { Rates } from '../interfaces/rates';

interface Props {
  initialData: {
    rates: Rates;
    pockets: Pockets;
  };
}

export default function Home({ initialData }: Props) {
  return (
    <div>
      <Head>
        <title>Exchange Rate Widget</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex h-screen bg-gradient-to-b from-blue-50 to-blue-100">
          <RatesContainer.Provider initialState={initialData.rates}>
            <PocketsContainer.Provider initialState={initialData.pockets}>
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

export async function getServerSideProps() {
  const initialData = {
    rates: {
      [Currency.EUR]: await fetchRatesData(Currency.EUR),
      [Currency.USD]: await fetchRatesData(Currency.USD),
      [Currency.GBP]: await fetchRatesData(Currency.GBP),
    },
    pockets: {
      [Currency.EUR]: { balance: 100, currency: Currency.EUR },
      [Currency.USD]: { balance: 50, currency: Currency.USD },
      [Currency.GBP]: { balance: 25, currency: Currency.GBP },
    },
  };
  return {
    props: {
      initialData,
    },
  };
}
