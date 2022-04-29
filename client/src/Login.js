import React from 'react';
import './view/Login.css'
import Logo from './Logo';
export default function Login() {
    return (
        <div className="body">
            <Logo />
            <div className="title">
                Log in
            </div>
            <div className="Login">

                <label className="User" for="uname"><b>Username</b></label>
                <input type="text" name="uname" required />

                <label className="User" for="psw"><b>Password</b></label>
                <input type="password" name="psw" required />

                <button className="loginButton">Log in</button>

            </div>

            <div className="otherInfo">
                <div className="optionUnit">
                    <div className="text">Forget password</div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    <div className="text">Register</div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Login };
