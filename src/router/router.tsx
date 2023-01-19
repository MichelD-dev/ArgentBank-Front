import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
//   import Error404 from '../pages/error404/Error404'
import Layout from '../layout/Layout'
import Error404 from '../pages/error404/Error404'
import Home from '../pages/home/Home'
import Profile from '../pages/profile/Profile'
import SignIn from '../pages/sign-in/Sign-in'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<SignIn />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<Error404 />} />
    </Route>,
  ),
)

export default router
