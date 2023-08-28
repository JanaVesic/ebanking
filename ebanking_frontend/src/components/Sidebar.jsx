import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {useState, useEffect} from 'react';

const Sidebar = ({ isLoggedIn }) => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState('');
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location]);

  useEffect(() => {
    setRole(localStorage.getItem('role'))
  }, []);

  return (
    <>
      {!isLoggedIn ? <>
        <Link to={'/'}><h2>Banka</h2></Link>
        <Link to={'/mainPage'}><button className={`sidebar-btn ${selectedLink === '/mainPage' ? 'active' : ''}`}>Početna strana</button></Link>
        <Link to={'/register'}><button className={`sidebar-btn ${selectedLink === '/register' ? 'active' : ''}`}>Kreiraj nalog</button></Link>
        <Link to={'/login'}><button className={`sidebar-btn ${selectedLink === '/login' ? 'active' : ''}`}>Prijavi se</button></Link>
      </>:
      <div className="sidebar">
        <Link to={'/'}><h2>Banka</h2></Link>
        <Link to={'/mainPage'}><button className={`sidebar-btn ${selectedLink === '/mainPage' ? 'active' : ''}`}>Početna strana</button></Link>
        <Link to={'/account'}><button className={`sidebar-btn ${selectedLink === '/account' ? 'active' : ''}`}>Moji računi</button></Link>
        {localStorage.getItem('role')==="ADMIN" && <>
          <Link to={'/supportAdmin'}><button className={`sidebar-btn ${selectedLink === '/supportAdmin' ? 'active' : ''}`}>Podrška Admin</button></Link>
          <Link to={'/analytics'}><button className={`sidebar-btn ${selectedLink === '/analytics' ? 'active' : ''}`}>Podaci</button></Link>
        </>}
        {localStorage.getItem('role')==="KORISNIK" && <>
          <Link to={'/transfer'}><button className={`sidebar-btn ${selectedLink === '/transfer' ? 'active' : ''}`}>Plaćanja</button></Link>
          <Link to={'/exchange'}><button className={`sidebar-btn ${selectedLink === '/exchange' ? 'active' : ''}`}>Menjačnica</button></Link>
          <Link to={'/support'}><button className={`sidebar-btn ${selectedLink === '/support' ? 'active' : ''}`}>Postavi pitanje</button></Link>
          <Link to={'/supportUser'}><button className={`sidebar-btn ${selectedLink === '/supperUser' ? 'active' : ''}`}>Podrška</button></Link>
        </>}
        <Link to={'/transactions'}><button className={`sidebar-btn ${selectedLink === '/transactions' ? 'active' : ''}`}>Transakcije</button></Link>
      </div>}
    </>
  );
}

export default Sidebar;
