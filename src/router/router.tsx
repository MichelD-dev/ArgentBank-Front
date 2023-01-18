import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
//   import Error404 from '../pages/error404/Error404'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Profile from '../pages/profile/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      {/* <Route path="*" element={<Error404 />} /> */}
    </Route>,
  ),
)

export default router
