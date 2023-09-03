import React, { useEffect, useState } from 'react';
import './Account.css';
import axios from 'axios';

const Account = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/racuni/trenutnoUlogovaniRacun', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="account">
      <div><h1>Moj račun</h1></div>
      <div className="user-info">
        <h3>Dobrodošli, {data?.vlasnik.ime} {data?.vlasnik.prezime}!</h3>
        <p>Email: {data?.vlasnik.email}</p>
        <p>Stanje na računu: {data?.stanje} dinara</p>
      </div>
    </div>
  );
};

export default Account;
