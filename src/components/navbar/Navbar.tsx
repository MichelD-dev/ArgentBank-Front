import {NavLink} from 'react-router-dom'
import './Navbar.css'

let user: string

const Navbar = () => {
  return (
    <nav>
      <ul className="main-nav">
        {!user ? (
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
                Tony
              </NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/">
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
