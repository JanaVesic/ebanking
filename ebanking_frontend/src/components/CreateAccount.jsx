import { useState } from "react";
import "./CreateAccount.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
    const [stanje, setStanje] = useState(0);
    const [poruka, setPoruka] = useState('');
    const navigate = useNavigate();
    function createAccount(){
        axios({
            method: 'post',
            url: '/api/v1/racuni',
            baseURL: 'http://localhost:8080',
            data: {
                stanje 
            }, headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then((response) => {
            console.log(response);
            navigate('/account');
      
          }, (error) => {
            console.log(error);
          })
    }
    return ( 
        <div className="create-account">
            <input type="number" name="" id="racun" onChange={(event) => setStanje(event.target.value)}/>
            <button onClick={() => createAccount()}>Otvori racun</button>
            <p style={{color: 'red'}}>{poruka}</p>
        </div>
     );
}
 
export default CreateAccount;