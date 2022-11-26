import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, isRemember } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message, rememberMe } =
    useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    // redirect authenticated user to profile screen
    if (isSuccess || user) {
      navigate('/profile')
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  const handleRememberMe = (e) => {
    dispatch(isRemember(e.target.checked))
  }

  if (rememberMe === true) {
    localStorage.setItem('token', user)
  } else {
    sessionStorage.setItem('token', user)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label>Username</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              onChange={handleRememberMe}
            />
            <label>Remember me</label>
          </div>

          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}

export default Login
