import axios from 'axios'
import LoginBody from "../Body/LoginBody";
import Navbar from '../Navbar/Navbar';

function Login(){
    return(
        <div>
            <Navbar/>
            <LoginBody/>
        </div>
    )
}

export default Login;