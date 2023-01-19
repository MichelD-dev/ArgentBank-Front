import Logo from '../logo/Logo'
import Navbar from '../navbar/Navbar'
import './Header.css'

const Header = () => {
  return (
    <nav className="main-nav">
      <Logo />
      <Navbar />
    </nav>
  )
}

export default Header
