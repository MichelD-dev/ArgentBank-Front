import LoginForm from '@/forms/loginForm/LoginForm'
import styles from './Login.module.scss'

const SignIn = () => {
  return (
    <main className={`${styles.main} ${styles.bgDark}`}>
      <section className={styles.signInContent}>
        <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  )
}

export default SignIn
