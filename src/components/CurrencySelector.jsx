import PropTypes from 'prop-types';

// Show all available currency in dropdown list, select to update
const CurrencySelector = ({ label, currencies, selectedCurrency, onCurrencyChange }) => {
  return (
    <div className="column">
      <label>{label}</label>
      <select value={selectedCurrency} onChange={(e) => onCurrencyChange(e.target.value)}>
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrencySelector.propTypes = {
  label: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};

export default CurrencySelector;
