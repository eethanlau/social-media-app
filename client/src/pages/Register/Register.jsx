import "./register.css"
import { useRef } from "react";
import { useNavigate } from "react-router"
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords do not match. Please try again.");
    } else {
      const user = {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value
      }
      try {
        await axios.post("/auth/register", user)
        .then((res) => 
        navigate("/login"))
        .catch(err => 
          console.log(err)
        );
      } catch (err) {
        console.log(err);
      }
    }
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
          <input placeholder="Username" required ref={username} className="loginInput" />
          <input placeholder="Email" required ref={email} className="loginInput" type="email"/>
          <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6"/>
          <input placeholder="Confirm Password" required ref={passwordAgain} className="loginInput" type="password"/>
          <button className="loginButton" type="submit">Sign Up</button>
          <button className="loginRegisterButton">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

