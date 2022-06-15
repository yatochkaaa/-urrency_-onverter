const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const exchangeRateAPI = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};
