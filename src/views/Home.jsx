import { useState } from 'react';
import Calculator from '../components/Calculator';
import Chart from '../components/Chart';

const Home = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MYR');

  return (
    <div className="main-container">
      <h1>Currency Exchange</h1>
      <div className="sub-container">
        <div className="calculator-container">
          <Calculator
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            setFromCurrency={setFromCurrency}
            setToCurrency={setToCurrency}
          />
        </div>
        <div className="chart-container">
          <Chart fromCurrency={fromCurrency} toCurrency={toCurrency} />
        </div>
      </div>
    </div>
  );
};

export default Home;
