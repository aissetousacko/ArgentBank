import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label>Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>
          {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
          <Link to="/profile" className="sign-in-button">
            Sign In
          </Link>
          {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
          {/* <!-- <button class="sign-in-button">Sign In</button> --> */}
          {/* <!--  --> */}
        </form>
      </section>
    </main>
  )
}

export default Login
