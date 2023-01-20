import {ChangeEvent, useEffect, useRef, useState} from 'react'
import {useLoginMutation} from '@/services/authApi'
import {useNavigate} from 'react-router-dom'
import './Login.css'

const initialState = {
  email: '',
  password: '',
}

const SignIn = () => {
  const [user, setUser] = useState(initialState)
  // const [errMsg, setErrMsg] = useState<string | null>(null)

  const {email, password} = user

  const [
    login,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation()

  const navigate = useNavigate()

  const userRef = useRef<HTMLInputElement>(null)

  useEffect(() => userRef.current?.focus(), [])

  // useEffect(() => setErrMsg(''), [user])

  // useEffect(() => console.log(errMsg), [errMsg])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && password) {
      await login({email, password})
    } else {
      console.log('Please fill all inputs')
    }
  }

  useEffect(() => {
    if (isLoginSuccess) {
      console.log(loginData.message)
      navigate('/profile')
    }
  }, [isLoginSuccess])

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
              ref={userRef}
              onChange={handleChange}
              value={email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
