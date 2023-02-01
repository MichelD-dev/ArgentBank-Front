import {useEffect, useRef} from 'react'
import {useLoginMutation} from '@/services/authApi'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '@/hooks/hooks'
import {toggleCheck, setToken} from '@/features/authSlice'
import {Form, Field} from 'react-final-form'
import {useValidators} from '../validators/validators'
import './LoginForm.css'

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
      //FIXME pas satisfaisant, si isSucccess, on a des data...
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
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form
          onSubmit={handleSubmit}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="email"
                validate={composeValidators(required, validEmail)}
                render={({input, meta}) => (
                  <div className="input-wrapper">
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
                  <div className="input-wrapper">
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
              <div className="input-remember">
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
              <button className="sign-in-button">Sign In</button>
            </form>
          )}
        />
      </section>
    </main>
  )
}

export default LoginForm
