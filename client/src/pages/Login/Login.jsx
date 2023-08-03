import "./login.css"
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  // Uses the references from the request that was sent in order for us to dereference the email and password for authentication
  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {email: email.current.value, password: password.current.value}, 
      dispatch
    );
  };

  console.log(user)
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
            <button className="loginButton" type="submit">{isFetching ?  "Loading..." : "Sign In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            {isFetching ?  "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

