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
        
        const data = {
          labels: response.data.map(account => account.vlasnik.username),
          datasets: [
            {
              label: 'Stanje na računu',
              data: response.data.map(account => account.stanje),
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
    
const fetchTransactions = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/transakcije', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTransactions(response.data.content);
    
    const last5Transactions = response.data.content.slice(-5);
    
    const data = {
      labels: last5Transactions.map(transaction => transaction.vreme),
      datasets: [
        {
          label: 'Uplate na racun',
          data: last5Transactions.map(transaction => transaction.iznos),
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
          <h1 style={{ color: '#007bff' }}>Računi korisnika</h1>
          {chartData && accounts.length > 0 && <Bar data={chartData} />}
        </div>
      </div>
      <div className="line">
        <div className="box">
          <h1 style={{ color: '#007bff' }}>Trend transakcija</h1>
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
                      text: 'Iznos',
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
