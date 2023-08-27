import './App.css';
import Login from './components/Login';
import LoginRegister from './components/LoginOrRegister';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Transfer from './components/Transfer';
import Account from './components/Account';
import Support from './components/Support';
import Exchange from './components/Exchange';
import SupportAdmin from './components/SupportAdmin';
import Answer from './components/Answer';
import Analytics from './components/Analytics';
import CreateAccount from './components/CreateAccount';
import Transactions from './components/Transactions';
import { useEffect, useState } from 'react';
import SupportUSer from './components/SupportUser';

function App() {
  const [ role, setRole ] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    if(localStorage.getItem('token') != null) {
      setIsLoggedIn(true);
      setRole(localStorage.getItem('role'))
    }
    else setIsLoggedIn(false);
  }, localStorage.getItem('token'), localStorage.getItem('role'))

  return (
    <BrowserRouter>
      <div className="App">
        <div className="sidebar">
          <Sidebar isLoggedIn={isLoggedIn}/>
        </div>
        <div className="page">
          <Routes>
            <Route path='/' element={<LoginRegister/>}/>
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/mainPage' element={<MainPage/>}/>
            <Route path='/transfer' element={<Transfer/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/support' element={<Support/>}/>
            <Route path='/supportAdmin' element={<SupportAdmin/>}/>
            <Route path='/supportUser' element={<SupportUSer/>}/>
            <Route path='/exchange' element={<Exchange/>}/>
            <Route path='/analytics' element={<Analytics/>}/>
            <Route path='/createAccount' element={<CreateAccount/>}/>
            <Route path='/transactions' element={<Transactions/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
