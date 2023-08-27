import { Link } from "react-router-dom";
import './LoginOrRegister.css';

const LoginRegister = () => {
    return ( 
        <div className="loginOrRegister">
            <div className="login-box">
                <h1>Postojeći korisnik? Prijavite se.</h1>
                <Link to={'/login'}><button className="login-btn">Prijavi se</button></Link>
            </div>
            <div className="login-box">
                <h1>Postanite korisnik u nekoliko klikova.</h1>
                <Link to={'/register'}><button className="login-btn">Otvori račun</button></Link>
            </div>
        </div>
     );
}
 
export default LoginRegister;