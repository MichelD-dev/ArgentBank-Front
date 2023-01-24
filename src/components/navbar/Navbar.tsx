import {useAppSelector} from '@/hooks/hooks'
import {persistor} from '@/store/store'
import {useCallback} from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const {userName} = useAppSelector(state => state.auth)

  const handleLogout = useCallback(async () => await persistor.purge(), [])

  return (
    <nav>
      <ul className="main-nav">
        {!userName?.firstName && !userName?.lastName ? (
          <li className="main-nav-item">
            <NavLink to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          </li>
        ) : (
          <>
            <li className="main-nav-item">
              <NavLink to="/profile">
                <i className="fa fa-user-circle"></i>
                {userName?.firstName}
              </NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Sign Out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
