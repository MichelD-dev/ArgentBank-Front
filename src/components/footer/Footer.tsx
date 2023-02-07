import styles from './Footer.module.scss'

/**
 * Footer component
 *
 * Displays a footer with a copyright message.
 *
 * @returns {ReactElement} The footer
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Copyright 2020 Argent Bank</p>
    </footer>
  )
}

export default Footer
