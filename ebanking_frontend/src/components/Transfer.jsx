import axios from 'axios';
import './Transfer.css';
import { useEffect, useState } from 'react';

const Transfer = () => {
  const [users, setUsers] = useState([]);
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('UPLATA_NA_RACUN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/korisnici', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Fetching users failed:', error);
      }
    };
    fetchData();
  }, []);

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
    setRecipientId('');
    setAmount('');
  };

  const transfer = () => {
    // alert(recipientId)
    if (transactionType === 'PRENOS_NA_DRUGI_RACUN') {
      const transferData = {
        tipTransakcije: transactionType,
        iznos: amount,
        primalac: {
          id: recipientId
        },
        // Add other properties specific to this transaction type
      };

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post('http://localhost:8080/api/v1/transakcije', transferData, config)
        .then((response) => {
          console.log('Transfer successful!', response.data);
        })
        .catch((error) => {
          console.error('Transfer failed:', error);
        });
    } else {
      const transferData = {
        tipTransakcije: transactionType,
        iznos: amount
      };

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post('http://localhost:8080/api/v1/transakcije', transferData, config)
        .then((response) => {
          console.log('Transfer successful!', response.data);
        })
        .catch((error) => {
          console.error('Transfer failed:', error);
        });
    }
  };

  return (
    <div className="transfer">
      <h2>Transfer Money</h2>
      <div>
        <label htmlFor="transactionType">Transaction Type:</label>
        <select
          id="transactionType"
          value={transactionType}
          onChange={handleTransactionTypeChange}
        >
          <option value="UPLATA_NA_RACUN">UPLATA NA RAČUN</option>
          <option value="ISPLATA_SA_RACUNA">ISPLATA SA RAČUNA</option>
          <option value="PRENOS_NA_DRUGI_RACUN">PRENOS NA DRUGI RAČUN</option>
        </select>
      </div>
      {transactionType === 'PRENOS_NA_DRUGI_RACUN' && (
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <select
            id="recipient"
            value={recipientId}
            onChange={(event) => setRecipientId(event.target.value)}
          >
            <option value="">Select a recipient</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <button onClick={() => transfer()}>Transfer</button>
    </div>
  );
};

export default Transfer;
