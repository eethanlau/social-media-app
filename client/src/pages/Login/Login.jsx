import "./login.css"
import { useRef } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value);
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">UserLink</h3>
            <span className="loginDesc">
              Connect with other companions at your university through UserLink.
            </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
            <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password}/>
            <button className="loginButton">Sign In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

