import Head from 'next/head';
import ExchangeWidget from '../components/ExchangeWidget/ExchangeWidget';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Exchange Rate Widget</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex h-screen bg-gradient-to-b from-blue-50 to-blue-100">
          <ExchangeWidget
            rounded
            className="w-full h-full sm:w-96 sm:h-96 m-auto shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}
