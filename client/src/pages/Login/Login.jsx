import "./login.css"

export default function Login() {
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
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">Sign In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

