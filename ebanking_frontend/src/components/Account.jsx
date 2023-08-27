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
        // console.log(response.data)
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    };
    fetchData();
  }, []);
  // Pretpostavljamo da imate pristup podacima korisnika i kreditne kartice. Ažurirajte sledeće sa odgovarajućim informacijama
  // const user = {
  //   name: 'John Doe', // Ime i prezime korisnika
  //   address: '123 Main Street', // Adresa korisnika
  //   email: 'johndoe@example.com', // Email adresa korisnika
  //   phoneNumber: '123-456-7890', // Broj telefona korisnika
  //   accountBalance: 5000.0, // Stanje na računu korisnika
  //   // Dodajte ostale relevantne informacije o korisniku ovde
  // };

  // const creditCard = {
  //   cardNumber: '**** **** **** 1234', // Broj kreditne kartice
  //   expirationDate: '12/25', // Datum isteka kreditne kartice
  //   cvv: '123', // CVV koda kreditne kartice
  //   // Dodajte ostale relevantne informacije o kreditnoj kartici ovde
  // };

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
