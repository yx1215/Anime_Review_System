import React, {useState} from 'react';
import './view/Login.css'
import Logo from './Logo';
import axios from "axios";

const link = 'http://localhost:8080';
export default function Login() {

    const [acct, setAcct] = useState({
        username: "",
        password: ""});

    async function sendRegister(acct) {
        // eslint-disable-next-line no-return-await
        console.log(acct);
        return await axios.post(`${link}/login`, `username=${acct.username}&password=${acct.password}`);
    }

    async function handleNameSubmit(e) {
        e.preventDefault();
        console.log(`${link}/login`);
        return sendRegister(acct).then((value) => {
            alert(value.data);
            if(value.data==="log in successfully!"){
                window.location.replace(`/`);
            }
        }).catch((err) => {
            alert(err);
        });
    }

    function handleUNameChange(e) {
        acct.username = e;
        console.log(acct);
        return e;
    }

    function handlePSWChange(e) {
        acct.password = e;
        console.log(acct);
        return e;
    }

    return (
        <div className="body">
            <Logo />
            <div className="title">
                Log in
            </div>
            <div className="Login">
                <form onSubmit={handleNameSubmit}>
                    <label className="User" for="uname"><b>Username</b></label>
                    <input type="text" name="uname" required onChange={(e) => { handleUNameChange(e.target.value); }} />

                    <label className="User" for="psw"><b>Password</b></label>
                    <input type="password" name="psw" required onChange={(e) => { handlePSWChange(e.target.value); }}/>

                    <button type="submit" className="loginButton">Log in</button>
                </form>
            </div>

            <div className="otherInfo">
                <div className="optionUnit">
                    <div className="text">Forget password</div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    <div className="text"><a href="/register">Register</a></div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Login };
