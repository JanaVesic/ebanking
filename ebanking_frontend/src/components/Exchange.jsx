import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Exchange.css'

const Exchange = () => {
  const [value, setValue] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedValue, setConvertedValue] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );
        setExchangeRate(response.data.rates[targetCurrency]);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleConvert = () => {
    if (!exchangeRate || !value) {
      setConvertedValue(null);
      return;
    }

    const convertedAmount = parseFloat(value) * exchangeRate;
    setConvertedValue(convertedAmount.toFixed(2));
  };

  return (
    <div className="exchange">
      <h2>Menjačnica</h2>
      <div>
        <label htmlFor="value">Iznos:</label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={handleValueChange}
        />
      </div>
      <div>
        <label htmlFor="baseCurrency">Iz valute:</label>
        <select
          id="baseCurrency"
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          
        </select>
      </div>
      <div>
        <label htmlFor="targetCurrency">U valutu:</label>
        <select
          id="targetCurrency"
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          
        </select>
      </div>
      <div className="button-container">
        <button onClick={handleConvert}>Razmeni</button>
      </div>
      {convertedValue && (
        <p>
          {value} {baseCurrency} = {convertedValue}{' '}
          {targetCurrency}
        </p>
      )}
    </div>
  );
};

export default Exchange;
