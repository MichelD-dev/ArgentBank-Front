import {setUserName} from '@/features/authSlice'
import {useAppDispatch, useAppSelector} from '@/hooks/hooks'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const {
    userName: {firstName, lastName},
  } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(
      setUserName({
        userName: {firstName: '', lastName: ''},
      }),
    )
  }

  return (
    <nav>
      <ul className="main-nav">
        {!firstName && !lastName ? (
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
                {firstName}
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
