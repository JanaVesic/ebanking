import axios from 'axios';
import React, { useState } from 'react';


const Answer = ({ question, setAnswerToggle }) => {
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

      axios.post('http://localhost:8080/api/v1/podrska/' + question.id + '/razresi', {
        odgovor: answer,
        id: question.id
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
      <h3>Question Subject: {question.subject}</h3>
      <p>Question Content: {question.content}</p>
      <textarea
        name="answer"
        id="answer"
        cols="30"
        rows="5"
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Enter your answer here..."
      />
      <button onClick={() => handleAnswerSubmit()}>Submit Answer</button>
    </div>
  );
};

export default Answer;
