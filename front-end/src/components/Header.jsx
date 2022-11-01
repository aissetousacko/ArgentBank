import React from 'react'
import { Link /* useNavigate */ } from 'react-router-dom'
import logo from '../assets/argentBankLogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Header = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userToken, firstName } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    // navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {userToken ? (
        <>
          {console.log('user name: ', firstName)}
          <div className="mainNavItem">
            <i className="fa fa-user-circle"></i>
            <span>{firstName}</span>
          </div>
          <Link to="/" className="main-nav-item" onClick={onLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </>
      )}
    </nav>
  )
}

export default Header
