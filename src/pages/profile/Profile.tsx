import {useProfileMutation} from '@/services/authApi'
import {useState, useEffect, ChangeEvent, useRef, FormEvent} from 'react'
import {setUserName} from '@/features/authSlice'
import {useAppDispatch, useAppSelector} from '@/hooks/hooks'
import styles from './profile.module.scss'

interface User {
  firstName: string
  lastName: string
}

const Profile = () => {
  const [user, setUser] = useState({firstName: '', lastName: ''})
  const [userEditing, setUserEditing] = useState(false)

  const dispatch = useAppDispatch()

  const {
    userName: {firstName, lastName},
  } = useAppSelector(state => state.auth)

  const [profile, {data, isSuccess, error}] = useProfileMutation()

  const userRef = useRef<HTMLInputElement>(null)

  useEffect(() => userRef.current?.focus(), [userEditing])

  useEffect(() => {
    profile()
  }, [])

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data)
      const {firstName, lastName} = data.body
      dispatch(
        setUserName({
          userName: {firstName, lastName},
        }),
      )
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleUserEdit = () => {
    setUserEditing(userEditing => !userEditing)
  }

  const handleUserEditValidation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      setUserName({
        userName: user,
      }),
    )
    setUserEditing(false)
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isSuccess && `${firstName} ${lastName}!`}
        </h1>
        <button className="edit-button" onClick={handleUserEdit}>
          Edit Name
        </button>
        {userEditing && (
          <form onSubmit={handleUserEditValidation}>
            <div className={styles.inputWrapper}>
              <div>
                <label htmlFor="firstName">firstName</label>
                <input
                  type="text "
                  id="firstName"
                  name="firstName"
                  ref={userRef}
                  onChange={handleChange}
                  value={user.firstName}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">lastName</label>
                <input
                  type="text "
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={user.lastName}
                  required
                />
              </div>
            </div>
            <button className="edit-button">Validate</button>
          </form>
        )}
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
