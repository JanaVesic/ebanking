import './Analytics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/racuni', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAccounts(response.data);
        // Create chart data using account data
        const data = {
          labels: response.data.map(account => account.vlasnik.username), // Use account IDs as labels
          datasets: [
            {
              label: 'Stanje na računu',
              data: response.data.map(account => account.stanje), // Use account balances as data
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Fetching accounts failed:', error);
      }
    };
    // Inside the fetchTransactions function
const fetchTransactions = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/transakcije', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTransactions(response.data.content);
    
    // Get the last 5 transactions for the chart
    const last5Transactions = response.data.content.slice(-5);
    
    // Create chart data using transaction data
    const data = {
      labels: last5Transactions.map(transaction => transaction.vreme), // Use transaction IDs as labels
      datasets: [
        {
          label: 'Uplate na racun',
          data: last5Transactions.map(transaction => transaction.iznos), // Use transaction balances as data
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData2(data);
  } catch (error) {
    console.error('Fetching transactions failed:', error);
  }
};

    fetchTransactions();
    fetchData();
  }, []);

  return (
    <div className="analytics">
      <div className="bar">
        <div className="box">
          <h1 style={{ color: '#007bff' }}>Account Balances</h1>
          {chartData && accounts.length > 0 && <Bar data={chartData} />}
        </div>
      </div>
      <div className="line">
        <div className="box">
          <h1 style={{ color: '#007bff' }}>Transactions Trend</h1>
          {chartData2 && transactions.length > 0 && (
            <Line
              data={chartData2}
              options={{
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: 'Vreme transakcija',
                    },
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: 'Transaction Balances',
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
