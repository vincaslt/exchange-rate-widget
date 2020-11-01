import Head from 'next/head';
import { fetchRatesData } from '../api/rates';
import ExchangeWidget from '../components/ExchangeWidget/ExchangeWidget';
import { Currency } from '../constants';
import PocketsContainer from '../containers/PocketsContainer';
import RatesContainer, { InitialRatesData } from '../containers/RatesContainer';

interface Props {
  initialData: InitialRatesData;
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
          <RatesContainer.Provider initialState={initialData}>
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

export async function getServerSideProps() {
  const initialData = {
    allRates: {
      [Currency.EUR]: await fetchRatesData(Currency.EUR),
      [Currency.USD]: await fetchRatesData(Currency.USD),
      [Currency.GBP]: await fetchRatesData(Currency.GBP),
    },
    baseCurrency: Currency.EUR,
  };
  return {
    props: {
      initialData,
    },
  };
}
