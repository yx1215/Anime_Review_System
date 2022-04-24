import React from 'react';
import './view/Register.css'
import Logo from './Logo';
export default function Register() {
    return (
        <div className="body">
            <Logo />
            <div className="title">
                Register
            </div>
            <div className="Register">

                <label className="User" for="uname"><b>Username</b></label>
                <input type="text" name="uname" required />

                <label className="User" for="psw"><b>Password</b></label>
                <input type="password" name="psw" required />

                <button className="registerButton">Register</button>

            </div>

            <div className="otherInfo">
                <div className="optionUnit">
                    <div className="text">Account log in</div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Register }; 