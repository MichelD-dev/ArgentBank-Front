import {Link} from 'react-router-dom'
import styles from './Logo.module.scss'

/**
* Logo component of Argent Bank
*
@returns {ReactElement} The Logo component
*/
const Logo = () => {
  return (
    <Link className={styles.mainNavLogo} to="/">
      <img
        className={styles.mainNavLogoImage}
        src="../../../public/img/argentBankLogo.png"
        alt="Argent Bank Logo"
      />
      <h1 className={styles.srOnly}>Argent Bank</h1>
    </Link>
  )
}

export default Logo
