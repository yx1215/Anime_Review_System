<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
import './view/Login.css'
import Logo from './Logo';
import axios from "axios";
=======
import React, {useState} from 'react';
import './view/Login.css'
import Logo from './Logo';
import axios from "axios";
import { ReactSession }  from 'react-client-session';
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77

const link = 'http://localhost:8080';
export default function Login() {

    const [acct, setAcct] = useState({
        username: "",
<<<<<<< HEAD
        password: ""
    });
=======
        password: ""});
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77

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
<<<<<<< HEAD
            if (value.data === "log in successfully!") {
=======
            console.log(value);
            if(value.data==="log in successfully!"){
                window.sessionStorage.setItem("username", acct.username);
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
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

<<<<<<< HEAD
=======
import React from 'react';
import './view/Login.css'
import Logo from './Logo';
export default function Login() {
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
    return (
        <div className="body">
            <Logo />
            <div className="title">
                Log in
            </div>
            <div className="Login">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                <form onSubmit={handleNameSubmit}>
                    <label className="User" for="uname"><b>Username</b></label>
                    <input type="text" name="uname" required onChange={(e) => { handleUNameChange(e.target.value); }} />

                    <label className="User" for="psw"><b>Password</b></label>
<<<<<<< HEAD
                    <input type="password" name="psw" required onChange={(e) => { handlePSWChange(e.target.value); }} />

                    <button type="submit" className="loginButton">Log in</button>
                </form>
=======

                <label className="User" for="uname"><b>Username</b></label>
                <input type="text" name="uname" required />

                <label className="User" for="psw"><b>Password</b></label>
                <input type="password" name="psw" required />

                <button className="loginButton">Log in</button>

>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
                    <input type="password" name="psw" required onChange={(e) => { handlePSWChange(e.target.value); }}/>

                    <button type="submit" className="loginButton">Log in</button>
                </form>
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
            </div>

            <div className="otherInfo">
                <div className="optionUnit">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                    <div className="text">Forget password</div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    <div className="text"><a href="/register">Register</a></div>
<<<<<<< HEAD
=======
                    <div className="text">login</div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    <div className="text">register</div>
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Login };
