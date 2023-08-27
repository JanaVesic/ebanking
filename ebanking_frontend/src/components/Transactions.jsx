import { useState } from 'react';
import './Transactions.css';
import axios from 'axios';
import { useEffect } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8080/api/v1/transakcije';

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            size: 2,
            page: currentPage,
          },
        });
        setTotalPages(response.data.totalPages);
        setTransactions(response.data.content);
        console.log(response.data);
      } catch (error) {
        console.error('Fetching questions failed:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  return (
    <div className="transactions">
      <div className="pagination">
        <button
          onClick={previousPage}
          disabled={currentPage === 0}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="pagination-button"
        >
          Next
        </button>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.posiljalac.vlasnik.username}</td>
              <td>{transaction.primalac.vlasnik.username}</td>
              <td>{transaction.iznos}</td>
              <td>{transaction.vreme}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
