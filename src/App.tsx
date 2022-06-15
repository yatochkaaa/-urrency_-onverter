import React from 'react';

import formatDate from './utils/formatDate';
import { exchangeRateAPI } from './api/api';
import { exchangeRateType } from './utils/types';
import { Converter } from './components/Converter';

import './styles/_normilize.scss';
import './styles/header.scss';
import './styles/main.scss';

const App: React.FC = () => {
  const [exchangeRate, setExchangeRate] = React.useState<exchangeRateType[]>([]);

  const getExchangeRate = async () => {
    const exchangeRateFromServer = await exchangeRateAPI();

    setExchangeRate([{
      "r030": 980,
      "txt": "Гривня",
      "rate": 1,
      "cc": "UAH",
      "exchangedate": formatDate(new Date())
    }, ...exchangeRateFromServer]);
  }

  React.useEffect(() => {
    getExchangeRate();
  }, []);

  const headerExchangeRate = ['USD', 'EUR'];

  return (
    <div className="App">
      <header className='header'>
        <ul className='header__currencyList'>
          {exchangeRate.map(currency => {
            if (headerExchangeRate.includes(currency.cc)) {
              return (
                <li className='header__currencyListItem' key={currency.cc}>
                  {currency.cc} - {currency.rate}
                </li>
              )
            }
          })}
        </ul>
      </header>

      <main className='main'>
          <Converter exchangeRate={exchangeRate} />
      </main>
    </div>
  );
}

export default App;
