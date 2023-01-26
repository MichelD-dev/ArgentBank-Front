import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Layout from '../layout/Layout'
import Error404 from '../pages/error404/Error404'
import Home from '../pages/home/Home'
import Profile from '../pages/profile/Profile'
import Login from '../forms/loginForm/LoginForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<Error404 />} />
    </Route>,
  ),
)

export default router
