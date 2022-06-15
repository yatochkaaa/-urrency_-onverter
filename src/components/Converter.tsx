import React from 'react';
import { exchangeRateType } from '../utils/types';
import '../styles/converter.scss';

interface Props {
  exchangeRate: exchangeRateType[];
}

export const Converter: React.FC<Props> = ({ exchangeRate }) => {
  const [converterGiveValue, setConverterGiveValue] = React.useState<number>(0);
  const [converterGetValue, setConverterGetValue] = React.useState<number>(0);
  const [converterGiveCurrency, setConverterGiveCurrency] = React.useState<string>('USD');
  const [converterGetCurrency, setConverterGetCurrency] = React.useState<string>('UAH');
  const [isGiveValue, setIsGiveValue] = React.useState<boolean>(true);

  const calculateGiveValue = (): number => {
    const currentGiveCurrency = exchangeRate.find(cur => cur.cc === converterGiveCurrency);
    const currentGetCurrency = exchangeRate.find(cur => cur.cc === converterGetCurrency);

    if (currentGiveCurrency && currentGetCurrency) {
      setConverterGetValue(currentGiveCurrency.rate * converterGiveValue / currentGetCurrency.rate);
    }

    return 0;
  }

  const calculateGetValue = (): number => {
    const currentGiveCurrency = exchangeRate.find(cur => cur.cc === converterGiveCurrency);
    const currentGetCurrency = exchangeRate.find(cur => cur.cc === converterGetCurrency);

    if (currentGetCurrency && currentGiveCurrency) {
      setConverterGiveValue(currentGetCurrency.rate * converterGetValue / currentGiveCurrency.rate);
    }

    return 0;
  }

  React.useEffect(() => {
    if (isGiveValue) {
      calculateGiveValue();
    }
  }, [converterGiveValue, converterGiveCurrency, converterGetCurrency]);

  React.useEffect(() => {
    if (!isGiveValue) {
      calculateGetValue();
    }
  }, [converterGetValue, converterGiveCurrency, converterGetCurrency]);

  const handleGiveValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    !isGiveValue && setIsGiveValue(true);
    setConverterGiveValue(Number(value));
  };

  const handleGetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    isGiveValue && setIsGiveValue(false);
    setConverterGetValue(Number(value));
  };

  const handleGiveCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === converterGetCurrency) {
      setConverterGetCurrency(converterGiveCurrency);
    }

    setConverterGiveCurrency(value);
  };

  const handleGetCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === converterGiveCurrency) {
      setConverterGiveCurrency(converterGetCurrency);
    }

    setConverterGetCurrency(value);
  };

  const swapCurrency = () => {
    const giveCurrency = converterGiveCurrency;
    const getCurrency = converterGetCurrency;

    setConverterGiveCurrency(getCurrency);
    setConverterGetCurrency(giveCurrency);
  }

  return (
    <div className='converter'>
    <div className="converter__item">
      <span>Меняю</span>
      <div className='converter__itemValue'>
        <input
          name='give'
          type="number"
          id="converter__itemValue--1"
          min="0"
          value={converterGiveValue}
          onChange={handleGiveValue}
        />
        <select
          value={converterGiveCurrency}
          id="converter__giveCurrency"
          onChange={handleGiveCurrency}
        >
          {exchangeRate.map(currency => {
            return (
              <option
                key={currency.cc}
                value={currency.cc}
              >
                {currency.cc}
              </option>
            )
          })}
        </select>
      </div>
    </div>
    <div className='converter__arrowsImage' onClick={swapCurrency}></div>
    <div className="converter__item">
      <span>Получаю</span>
      <div className='converter__itemValue'>
        <input
          name='give'
          type="number"
          id="converter__itemValue--2"
          min="0"
          placeholder='00.0000'
          value={converterGetValue}
          onChange={handleGetValue}
        />
        <select
          id="converter__getCurrency"
          value={converterGetCurrency}
          onChange={handleGetCurrency}
        >
          {exchangeRate.map(currency => {
            return <option key={currency.cc} value={currency.cc}>{currency.cc}</option>;
          })}
        </select>
      </div>
    </div>
  </div>
  );
}