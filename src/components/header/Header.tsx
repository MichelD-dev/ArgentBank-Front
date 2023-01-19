import {Logo, Navbar} from '@/components'
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
