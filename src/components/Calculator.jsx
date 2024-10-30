import { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import { getCurrencies, getExchangeRate } from '../api/api';
import PropTypes from 'prop-types';

const Calculator = ({ fromCurrency, toCurrency, setFromCurrency, setToCurrency }) => {
  const [currencies, setCurrencies] = useState({});
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);

  // Initial currencies fetch
  useEffect(() => {
    const fetchCurrencies = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
    };
    fetchCurrencies();
  }, []);

  // Selected currency fetch
  useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await getExchangeRate(fromCurrency, toCurrency);
      setExchangeRate(rate);
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Swap currency
  const handleSwitchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <CurrencySelector
        label="From"
        currencies={currencies}
        selectedCurrency={fromCurrency}
        onCurrencyChange={setFromCurrency}
      />
      <CurrencySelector
        label="To"
        currencies={currencies}
        selectedCurrency={toCurrency}
        onCurrencyChange={setToCurrency}
      />
      <button onClick={handleSwitchCurrencies}>
        Switch
      </button>
      <div className="count-container">
        <input
          type="number"
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
        />
        <h4 className="mr-3">
          {fromCurrency}
        </h4>
      </div>
      <p>
        {Number(amount).toFixed(2)} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
      </p>
    </>
  );
};

Calculator.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  setFromCurrency: PropTypes.func.isRequired,
  setToCurrency: PropTypes.func.isRequired,
};

export default Calculator;
