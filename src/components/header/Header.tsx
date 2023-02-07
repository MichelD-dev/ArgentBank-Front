import {Logo, Navbar} from '@/components'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <nav className={styles.mainNav}>
      <Logo />
      <Navbar />
    </nav>
  )
}

export default Header
