import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <a className="main-nav-item" href="./user.html">
        <i className="fa fa-user-circle"></i>
        Tony
      </a>
      <a className="main-nav-item" href="./index.html">
        <i className="fa fa-sign-out"></i>
        Sign Out
      </a>
    </div>
  )
}

export default Navbar
