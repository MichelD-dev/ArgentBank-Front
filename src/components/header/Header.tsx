import {Logo, Navbar} from '@/components'
import styles from './Header.module.scss'

/**
 * Header component
 *
 * Displays a header with a logo and a navbar.
 *
 * @returns {ReactElement} The Logo and navbar
 */
const Header = () => {
  return (
    <nav className={styles.mainNav}>
      <Logo />
      <Navbar />
    </nav>
  )
}

export default Header
