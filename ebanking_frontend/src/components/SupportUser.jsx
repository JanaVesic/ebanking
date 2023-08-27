import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import axios from 'axios';
import './SupportAdmin.css'

const SupportUSer = () => {
    const [questions, setQuestions] = useState([]);
  const [answerToggle, setAnswerToggle] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [questionFilter, setQuestionFilter] = useState('all'); // Default filter
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8080/api/v1/podrska';

        if (questionFilter === 'solved') {
          apiUrl = 'http://localhost:8080/api/v1/podrska/razresene';
        } else if (questionFilter === 'unsolved') {
          apiUrl = 'http://localhost:8080/api/v1/podrska/nerazresene';
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }, params: {
            size: 3,
            page: currentPage
        }
        });
        setTotalPages(response.data.totalPages);
        setQuestions(response.data.content);
      } catch (error) {
        console.error('Fetching questions failed:', error);
      }
    };
    fetchData();
  }, [questionFilter, currentPage]); // Trigger the effect when questionFilter changes


  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
};

const previousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
};
    return ( 
        <>
    
      <div className="support" style={{ width: '500px' }}><div className="pagination">
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
        <h2>Support Questions</h2>
        <div>
          <button className='question-btn' onClick={() => setQuestionFilter('all')}>All Questions</button>
          <button className='question-btn' onClick={() => setQuestionFilter('solved')}>Solved</button>
          <button className='question-btn' onClick={() => setQuestionFilter('unsolved')}>Unsolved</button>
        </div>
        {answerToggle ? (
          <table style={{ width: '500px' }}>
            <thead>
              <tr>
                <th>Podnosilac</th>
                <th>Pitanje</th>
                <th>Vreme pitanja</th>
                <th>Odgovor</th>
                <th>Vreme odgovora</th>
              </tr>
            </thead>
            <tbody>
              {questions?.map((question) => (
                <tr key={question.id}>
                  <td>{`${question.podnosilac.ime} ${question.podnosilac.prezime}`}</td>
                  <td>{question.pitanje}</td>
                  <td>{question.vremePitanja}</td>
                  <td>
                    {question.odgovor !== null ? (
                      <>{question.odgovor}</>
                    ) : <>/</>}
                  </td>
                  <td>{question.odgovor !== null ? <>{question.vremeOdgovora}</> : <>/</>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Answer question={currentQuestion} setAnswerToggle={setAnswerToggle} />
        )}
      </div>
    </>
     );
}
 
export default SupportUSer;