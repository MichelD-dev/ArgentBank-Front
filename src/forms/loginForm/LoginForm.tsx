import {useEffect, useRef} from 'react'
import {useLoginMutation} from '@/services/authApi'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '@/hooks/hooks'
import {toggleCheck, setToken} from '@/features/authSlice'
import {Form, Field} from 'react-final-form'
import {useValidators} from '../validators/validators'
import {TokenSchema} from '@/types/user.model'
import styles from './LoginForm.module.scss'

const LoginForm = () => {
  const dispatch = useAppDispatch()

  const [login, {data, isSuccess, error}] = useLoginMutation()

  const navigate = useNavigate()

  const emailInputRef = useRef<HTMLInputElement>(null)

  const passwordInputRef = useRef<HTMLInputElement>(null)

  const {required, validEmail, validPassword, composeValidators} =
    useValidators()

  useEffect(() => emailInputRef.current?.focus(), [])

  const handleSubmit = async () => {
    const email = emailInputRef.current?.value
    const password = passwordInputRef.current?.value

    if (email && password) {
      await login({email, password})
    } else {
      console.log('Please fill all inputs')
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      const parsedToken = TokenSchema.safeParse(data.body.token)

      if (!parsedToken.success) {
        console.log(
          'Error: ' + parsedToken.error.issues[0].code + ':',
          parsedToken.error.issues[0].message,
        )
        return
      }

      dispatch(
        setToken({
          token: data.body.token,
        }),
      )
      navigate('/profile')
    }
    if (error) {
      if ('status' in error) {
        const errMsg =
          'error' in error ? error.error : JSON.stringify(error.data)
        console.log(errMsg)
      } else {
        console.log(error.message)
      }
    }
  }, [isSuccess, error])

  return (
    <main className={styles.main}>
      <section className={styles.signInContent}>
        <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
        <h1>Sign In</h1>
        <Form
          onSubmit={handleSubmit}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="email"
                validate={composeValidators(required, validEmail)}
                render={({input, meta}) => (
                  <div className={styles.inputWrapper}>
                    <label>
                      Username<span style={{color: 'red'}}>*</span>
                    </label>
                    <input type="text " {...input} ref={emailInputRef} />
                    {meta.error && meta.touched && (
                      <span style={{color: 'red'}}>{meta.error}</span>
                    )}
                  </div>
                )}
              />
              <Field
                name="password"
                validate={composeValidators(required, validPassword)}
                render={({input, meta}) => (
                  <div className={styles.inputWrapper}>
                    <label>
                      Password<span style={{color: 'red'}}>*</span>
                    </label>
                    <input type="password" {...input} ref={passwordInputRef} />
                    {meta.error && meta.touched && (
                      <span style={{color: 'red'}}>{meta.error}</span>
                    )}
                  </div>
                )}
              />
              <div className={styles.inputRemember}>
                <Field
                  name="checkbox"
                  render={({input}) => (
                    <>
                      <input
                        type="checkbox"
                        {...input}
                        onChange={() => dispatch(toggleCheck())}
                      />
                      <label>Remember me</label>
                    </>
                  )}
                />
              </div>
              <button className={styles.signInButton}>Sign In</button>
            </form>
          )}
        />
      </section>
    </main>
  )
}

export default LoginForm
