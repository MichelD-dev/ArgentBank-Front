import {useEffect, useRef, useState} from 'react'
import {useLoginMutation} from '@/services/authApi'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '@/hooks/hooks'
import {setPersistCheck, setToken} from '@/features/authSlice'
import './Login.css'

const SignIn = () => {
  const [checked, setChecked] = useState(false)
  // const [errMsg, setErrMsg] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const [login, {data, isSuccess, error}] = useLoginMutation()

  const navigate = useNavigate()

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => emailInputRef.current?.focus(), [])

  // useEffect(() => setErrMsg(''), [formValue])

  // useEffect(() => console.log(errMsg), [errMsg])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailInputRef.current?.value
    const password = passwordInputRef.current?.value

    if (email && password) {
      await login({email, password})
      dispatch(setPersistCheck({PersistCheck: checked}))
    } else {
      console.log('Please fill all inputs')
    }
  }

  const handleCheck = () => {
    setChecked(checked => !checked)
  }

  useEffect(() => {
    if (isSuccess) {
      // console.log(data)
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
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text "
              id="username"
              name="email"
              ref={emailInputRef}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" onChange={handleCheck} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
