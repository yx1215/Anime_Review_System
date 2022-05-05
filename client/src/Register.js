import React, {useEffect, useState} from 'react';
import './view/Register.css'
import Logo from './Logo';
import axios from "axios";

const link = 'http://localhost:8080';
// let username;
// let password;

export default function Register() {
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    // username = params.get('username');
    // password = params.get('password');
    const [acct, setAcct] = useState({
        username: "",
        password: ""});

    async function sendRegister(acct) {
        // eslint-disable-next-line no-return-await
        console.log(acct);
        return await axios.post(`${link}/register`, `username=${acct.username}&password=${acct.password}`);
    }

    async function handleNameSubmit(e) {
        e.preventDefault();
        console.log(`${link}/register`);
        return sendRegister(acct).then((value) => {
            alert(value.data);
            if(value.data==="Register complete."){
                window.location.replace("/login");
            }
        }).catch((err) => { console.log(err); });
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
            <div className="registerTitle">
                Register
            </div>
            <div className="Register">
                <form onSubmit={handleNameSubmit}>
                    <label className="User" for="uname"><b>Username</b></label>
                    <input type="text" name="username" required onChange={(e) => { handleUNameChange(e.target.value); }} />

                    <label className="User" for="psw"><b>Password</b></label>
                    <input type="password" name="password" required onChange={(e) => { handlePSWChange(e.target.value); }} />

                    <div><button type="submit" className="registerButton" value="register">Register</button></div>
                </form>
            </div>

            <div className="otherInfo">
                <div className="optionUnit">
                    <div className="text" id="longSentence"><a href="/login">Have account already? Login</a></div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Register }; 
