import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getHistoricalRates } from '../api/api';
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ fromCurrency, toCurrency }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      const today = new Date();
      const pastDate = new Date();
      // get previous 1 month
      pastDate.setMonth(today.getMonth() - 1);

      const start = pastDate.toISOString().split('T')[0];
      const end = today.toISOString().split('T')[0];

      const rates = await getHistoricalRates(fromCurrency, toCurrency, start, end);
      const labels = Object.keys(rates);
      const data = Object.values(rates).map(rate => rate[toCurrency]);

      setChartData({
        labels,
        datasets: [
          {
            label: `Exchange Rate ${fromCurrency} to ${toCurrency}`,
            data,
            borderColor: 'blue',
            fill: false,
          },
        ],
      });
    };
    fetchHistoricalRates();
  }, [fromCurrency, toCurrency]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={options} height={250} />
    </div>
  );
};

Chart.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
};

export default Chart;
