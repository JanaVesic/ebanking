import axios from 'axios';
import React, { useState } from 'react';


const Answer = ({ currentQuestion, setAnswerToggle }) => {
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  function handleAnswerSubmit(){
    const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post('http://localhost:8080/api/v1/podrska/' + currentQuestion.id + '/razresi', {
        odgovor: answer,
        id: currentQuestion.id
      }, config)
        .then((response) => {
          console.log('Transfer successful!', response.data);
        })
        .catch((error) => {
          console.error('Transfer failed:', error);
        });
  }

  return (
    <div className="answer">
      <p>Pitanje: {currentQuestion.pitanje}</p>
      <textarea
        name="answer"
        id="answer"
        cols="30"
        rows="5"
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Unesi odgovor..."
      />
      <button onClick={() => handleAnswerSubmit()}>Pošalji odgovor</button>
    </div>
  );
};

export default Answer;
