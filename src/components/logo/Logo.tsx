import {Link} from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link className="main-nav-logo" to="/">
      <img
        className="main-nav-logo-image"
        src="../../../public/img/argentBankLogo.png"
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
  )
}

export default Logo
