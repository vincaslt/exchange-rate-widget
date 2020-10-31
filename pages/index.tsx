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
          <ExchangeWidget className="w-96 h-96 m-auto rounded-lg shadow-lg" />
        </div>
      </main>
    </div>
  );
}
