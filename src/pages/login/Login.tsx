import {useEffect, useRef, useState} from 'react'
import axios from '@/api/api'
import {useNavigate} from 'react-router-dom'
import {AxiosError} from 'axios'
import './Login.css'

const LOGIN_URL = 'api/V1/user/login'

interface LoginResponse {
  status: number
  message: string
  body: {
    token: string
  }
}

interface Error {
  message: string[]
  statusCode: number
}

const SignIn = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const navigate = useNavigate()

  const userRef = useRef<HTMLInputElement>(null)

  useEffect(() => userRef.current?.focus(), [])

  useEffect(() => setErrMsg(''), [email, password])

  useEffect(() => console.log(errMsg), [errMsg])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post<LoginResponse>(
        LOGIN_URL,
        JSON.stringify({email, password}),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      setEmail('')
      setPassword('')
      const accesToken = response?.data?.body.token
      console.log(accesToken)
      navigate('/profile')
    } catch (err) {
      const error = err as AxiosError<Error>
      if (!error?.response) {
        setErrMsg('No server Response')
      } else if (error?.response?.status === 400) {
        setErrMsg('User not found')
      } else if (error?.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={e => setEmail(e.target.value)}
              value={email || ''}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              value={password || ''}
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
