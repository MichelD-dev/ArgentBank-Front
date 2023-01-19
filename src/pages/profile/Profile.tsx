import {useState, useEffect} from 'react'
import axios from '@/api/api'
import {AxiosError} from 'axios'
import './Profile.css'

interface User {
  firstName: string
  lastName: string
}

interface Error {
  message: string[]
  statusCode: number
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUser = async () => {
      try {
        const response = await axios.get('/', {
          signal: controller.signal,
        })
        console.log(response.data)
        isMounted && setUser(response.data)
      } catch (err) {
        const error = err as AxiosError<Error>
        console.error(error)
      }
    }

    getUser()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {/* {user && user.name} */}
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profile
