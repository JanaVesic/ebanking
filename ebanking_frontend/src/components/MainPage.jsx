import React, { useEffect, useState } from 'react';
import './MainPage.css';
import axios from 'axios';

const MainPage = () => {

  const [news, setNews] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'https://eodhistoricaldata.com/api/news?api_token=demo&s=AAPL.US&offset=0&limit=10';

        const response = await axios.get(apiUrl);
        setNews(response.data[0].content);
        // console.log(response.data[0].content);
      } catch (error) {
        console.error('Fetching questions failed:', error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className="main-page">
      {/* <div> */}
        <h1>Dobrodošli u našu banku!</h1>
      {/* </div> */}
      <p>
        Drago nam je što ste izabrali našu banku za vaše finansijske potrebe. Mi smo pouzdana finansijska institucija koja pruža širok spektar usluga i proizvoda kako biste mogli da ostvarite svoje ciljeve i želje.
      </p>
      <h1>Berza i finansijske vesti:</h1>
      <p>
        {news}
      </p>
    </div>
  );
};

export default MainPage;
