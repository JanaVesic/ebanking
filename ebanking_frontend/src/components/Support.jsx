import React, { useState } from 'react';
import './Support.css'
import axios from 'axios';

const Support = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  function send(){
    const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post('http://localhost:8080/api/v1/podrska', {
        pitanje: message
      }, config)
        .then((response) => {
          console.log('Transfer successful!', response.data);
        })
        .catch((error) => {
          console.error('Transfer failed:', error);
        });
  }

  return (
    <div className="support-box">
      <h2>Support Request</h2>
        <div className='support-input'>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
        </div>
        <button onClick={() => send()}>Submit</button>
    </div>
  );
};

export default Support;
