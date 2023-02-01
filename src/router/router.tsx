import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  useLocation,
} from 'react-router-dom'
import Layout from '../layout/Layout'
import Error404 from '../pages/error404/Error404'
import Home from '../pages/home/Home'
import Profile from '../pages/profile/Profile'
import {useAppSelector} from '@/hooks/hooks'
import SignIn from '@/forms/loginForm/LoginForm'

function RequireAuth({children}: {children: JSX.Element}) {
  const isLogged = useAppSelector(state => state.auth.token)
  const location = useLocation()

  if (!isLogged) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children
}

function RequireUnAuth({children}: {children: JSX.Element}) {
  const isLogged = useAppSelector(state => state.auth.token)
  const location = useLocation()

  if (isLogged) {
    console.log(isLogged)

    return <Navigate to="/" state={{from: location}} replace />
  }
  console.log(isLogged)
  return children
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        path="login"
        element={
          <RequireUnAuth>
            <SignIn />
          </RequireUnAuth>
        }
      />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Route>,
  ),
)

export default router
