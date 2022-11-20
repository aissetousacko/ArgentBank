import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth)

  if (!userToken) {
    // not logged in so redirect to home page with the return url
    return <Navigate to="/" />
  }

  // authorized so return child components
  return <Outlet />
}
