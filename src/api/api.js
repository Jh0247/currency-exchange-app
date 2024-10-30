import axios from 'axios';

const BASE_URL = 'https://api.frankfurter.app';

// Get available currency options
/* curl -s https://api.frankfurter.app/currencies */
export const getCurrencies = async () => {
  const response = await axios.get(`${BASE_URL}/currencies`);
  return response.data;
};

// Get exchange rates between two currencies
/* curl -s https://api.frankfurter.app/latest */
// fetch(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`)
// amount : 1
// base : "USD"
// date : "2024-10-29"
// rates: 
// {
//   MYR : 4.3783
// }

export const getExchangeRate = async (from, to) => {
  const response = await axios.get(`${BASE_URL}/latest`, {
    params: {
      base: from,
      symbols: to,
    },
  });
  // console.log(response);
  return response.data.rates[to];
};

// Get historical rates
/* curl -s https://api.frankfurter.app/2000-01-01..2000-12-31 */
export const getHistoricalRates = async (from, to, start, end) => {
  const response = await axios.get(`${BASE_URL}/${start}..${end}`, {
    params: {
      base: from,
      symbols: to,
    },
  });
  return response.data.rates;
};
